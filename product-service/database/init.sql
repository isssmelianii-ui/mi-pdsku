CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    stock INT NOT NULL DEFAULT 0,
    image MEDIUMTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Data Contoh (Ditambahkan kolom image dengan string Base64 gambar 1x1 piksel yang valid)
INSERT INTO products (name, description, price, stock, image) VALUES
('Keyboard Mekanik', 'Keyboard mekanik switch blue', 500000, 25, 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChWGA60e6kgAAAABJRU5BrkJggg=='),
('Mouse Wireless', 'Mouse wireless dengan sensor optical', 350000, 10, 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChWGA60e6kgAAAABJRU5BrkJggg=='),
('Headset Gaming', 'Headset gaming dengan kualitas audio terbaik', 800000, 15, 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChWGA60e6kgAAAABJRU5BrkJggg==');