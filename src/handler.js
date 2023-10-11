const { nanoid } = require("nanoid")
const books = require("./books")

// menyimpan buku
const addBookHandler = (request, h) => {
    const { name, nim, kelas } = request.payload;

    const isSuccess = true;

    if (!name || !nim || !kelas) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan data. Mohon isi semua field.',
        });
        response.code(400);
        return response;
    }

    const newBook = {
        name,
        nim,
        kelas,
    };
    books.push(newBook);

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Data berhasil ditambahkan',
            name,
            nim,
            kelas,
        });
        response.code(201);
        return response;
    }
    return h.redirect('/hasil.html');
};




//menyimpan buku end

//mengambil semua isi books

const getAllBooksHandler = (request, h) => {
    if (books.length === 0) {
        const response = h.response({
            status: 'fail',
            message: 'Belum ada data yang tersimpan.',
        });
        response.code(404);
        return response;
    }

    const data = books.map((book) => ({
        name: book.name,
        nim: book.nim,
        kelas: book.kelas,
    }));

    const response = h.response({
        status: 'success',
        data,
    });

    return response;
};



// mengambil semua isi books end







module.exports = {addBookHandler, getAllBooksHandler};
