const productModel = require('../models/productModel');

// Helper fungsi validasi gambar Base64
function validateBase64Image(image) {
    // 1. Cek apakah field image kosong atau tidak dikirim
    if (!image || typeof image !== 'string' || image.trim() === '') {
        return { valid: false, message: 'Field image wajib diisi' };
    }

    // 2. Buang Data URI prefix jika ada (contoh: "data:image/png;base64,")
    let base64Data = image;
    if (base64Data.includes(',')) {
        base64Data = base64Data.split(',')[1];
    }

    // 3. Cek apakah format Base64 valid (Panjang habis dibagi 4 & karakter regex)
    const isLengthValid = base64Data.length % 4 === 0;
    const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/;
    if (!isLengthValid || !base64Regex.test(base64Data)) {
        return { valid: false, message: 'Field image harus berupa Base64 yang valid' };
    }

    // 4. Cek ukuran hasil decode (Maksimal 2 MB = 2.097.152 Byte)
    const imageSizeInBytes = Buffer.byteLength(base64Data, 'base64');
    const maxSize = 2 * 1024 * 1024; // 2 MB
    if (imageSizeInBytes > maxSize) {
        return { valid: false, message: 'Ukuran image maksimal 2 MB' };
    }

    return { valid: true, cleanBase64: base64Data };
}

// GET ambil semua products
async function index(req, res) {
    try {
        const products = await productModel.getAllProducts();
        res.status(200).json({
            message: 'Berhasil mengambil data produk',
            data: products
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Gagal mengambil data produk',
            error: error.message 
        });
    }
}

// GET ambil produk berdasarkan ID
async function show(req, res) {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ message: 'ID produk tidak valid' });
        }
        const product = await productModel.getProductById(id);
        if (!product) {
            return res.status(404).json({ message: 'Produk tidak ditemukan' });
        }
        res.status(200).json({
            message: 'Berhasil mengambil detail produk',
            data: product
        });
    } catch (error) {
        res.status(500).json({
            message: 'Gagal mengambil detail produk',
            error: error.message
        });
    }
}

// POST tambah produk
async function createProduct(req, res) {
    try {
        const { name, description, price, stock, image } = req.body;

        // Validasi field dan tipe data sebelum mengakses database.
        if (typeof name !== 'string' || name.trim() === '' || price === undefined || stock === undefined) {
            return res.status(400).json({ message: 'Field name, price, dan stock wajib diisi dengan format yang benar' });
        }
        if (typeof price !== 'number' || !Number.isFinite(price) || price < 0) {
            return res.status(400).json({ message: 'Field price harus berupa angka >= 0' });
        }
        if (!Number.isSafeInteger(stock) || stock < 0) {
            return res.status(400).json({ message: 'Field stock harus berupa bilangan bulat >= 0' });
        }

        // Validasi khusus field image
        const imageValidation = validateBase64Image(image);
        if (!imageValidation.valid) {
            return res.status(400).json({ message: imageValidation.message });
        }

        const product = await productModel.createProduct({ 
            name: name.trim(),
            description: typeof description === 'string' && description.trim() !== '' ? description.trim() : null,
            price,
            stock,
            image: imageValidation.cleanBase64 
        });

        res.status(201).json({
            message: 'Berhasil menambah data produk',
            data: product
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Gagal menambah data produk',
            error: error.message 
        });
    }
}

// PUT update produk
async function updateProduct(req, res) {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ message: 'ID produk tidak valid' });
        }

        const { name, description, price, stock, image } = req.body;

        // Validasi field dan tipe data sebelum mengakses database.
        if (typeof name !== 'string' || name.trim() === '' || price === undefined || stock === undefined) {
            return res.status(400).json({ message: 'Field name, price, dan stock wajib diisi dengan format yang benar' });
        }
        if (typeof price !== 'number' || !Number.isFinite(price) || price < 0) {
            return res.status(400).json({ message: 'Field price harus berupa angka >= 0' });
        }
        if (!Number.isSafeInteger(stock) || stock < 0) {
            return res.status(400).json({ message: 'Field stock harus berupa bilangan bulat >= 0' });
        }

        // Validasi khusus field image (Aturan sama persis seperti Create)
        const imageValidation = validateBase64Image(image);
        if (!imageValidation.valid) {
            return res.status(400).json({ message: imageValidation.message });
        }

        const existing = await productModel.getProductById(id);
        if (!existing) {
            return res.status(404).json({ message: 'Produk tidak ditemukan' });
        }

        const product = await productModel.updateProduct(id, { 
            name: name.trim(),
            description: typeof description === 'string' && description.trim() !== '' ? description.trim() : null,
            price,
            stock,
            image: imageValidation.cleanBase64 
        });

        res.status(200).json({
            message: 'Berhasil memperbarui data produk',
            data: product
        });
    } catch (error) {
        res.status(500).json({
            message: 'Gagal memperbarui data produk',
            error: error.message
        });
    }
}

// DELETE hapus produk
async function destroy(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: 'ID produk tidak valid'
            });
        }

        const deleted = await productModel.deleteProduct(id);

        if (!deleted) {
            return res.status(404).json({
                message: 'Produk tidak ditemukan'
            });
        }

        res.status(200).json({
            message: 'Berhasil menghapus data produk'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Gagal menghapus data produk',
            error: error.message
        });
    }
}

module.exports = {
    index,
    show,
    createProduct,
    updateProduct,
    destroy
};