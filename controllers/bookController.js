const { Book } = require('../models/book')
const nanoId = require('nanoid').nanoid
const getBooks = async (request, h) => {
  try {
    const books = await Book.findAll({
      attributes: {
        exclude: [
          'year',
          'author',
          'summary',
          'pageCount',
          'readPage',
          'finished',
          'reading',
          'insertedAt',
          'updatedAt']
      }
    })
    return h.response({
      status: 'success',
      data: {
        books
      }
    }).code(200)
  } catch (error) {
    return h.response({
      status: 'fail',
      message: 'Terjadi kesalahan saat mengambil data buku'
    }).code(500)
  }
}

const addBook = async (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    }).code(400)
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    }).code(400)
  }

  const id = nanoId(16) // Pastikan Anda telah mendefinisikan nanoId sesuai kebutuhan Anda

  try {
    const newBook = await Book.create({
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished: pageCount === readPage,
      reading,
      insertedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })

    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: newBook.id
      }
    }).code(201)
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message)
      return h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Data yang dimasukkan tidak valid',
        error: errors
      }).code(400)
    }
    return h.response({
      status: 'fail',
      message: 'Terjadi kesalahan saat menambahkan buku'
    }).code(500)
  }
}

const getBookById = async (request, h) => {
  const { id } = request.params
  try {
    const book = await Book.findByPk(id)

    if (!book) {
      return h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
      }).code(404)
    }
    return h.response({
      status: 'success',
      data: {
        book
      }
    }).code(200)
  } catch (error) {
    return h.response({
      status: 'fail',
      message: 'Terjadi kesalahan saat mengambil data buku'
    }).code(500)
  }
}

const updateBookById = async (req, h) => {
  const { id } = req.params
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload

  try {
    if (!name) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku'
      }).code(400)
    }
    if (readPage > pageCount) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
      }).code(400)
    }

    const book = await Book.findByPk(id)

    if (!book) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan'
      }).code(404)
    }

    await book.update({
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished: pageCount === readPage,
      reading,
      updatedAt: new Date().toISOString()
    })

    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    }).code(200)
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message)
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Data yang dimasukkan tidak valid',
        error: errors
      }).code(400)
    }
    return h.response({
      status: 'fail',
      message: 'Terjadi kesalahan saat memperbarui buku'
    }).code(500)
  }
}

const deleteBookById = async (req, h) => {
  const { id } = req.params
  try {
    const book = await Book.findByPk(id)

    if (!book) {
      return h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan'
      }).code(404)
    }
    await book.destroy()
    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    }).code(200)
  } catch (error) {
    return h.response({
      status: 'fail',
      message: 'Terjadi kesalahan saat menghapus buku'
    }).code(500)
  }
}

module.exports = { getBooks, addBook, getBookById, updateBookById, deleteBookById }
