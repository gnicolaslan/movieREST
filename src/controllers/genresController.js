const createResponsesError = require('../helpers/createResponsesError');
const { getAllGenres, getOneGenre, createGenre, updateGenre, destroyGenre } = require('../services/genresServices');

const genresController = {
    list: async (req, res) => {

        try {

            const genres = await getAllGenres()

            return res.status(200).json({
                ok: true,
                data: genres,
                meta: {
                    status: 200,
                    total: genres.length,
                    url: '/api/genres'
                }
            })

        } catch (error) {
            return createResponsesError(res, error)
        }
    },
    detail: async (req, res) => {

        try {

            const { id } = req.params;

            const genre = await getOneGenre(id)

            return res.status(200).json({
                ok: true,
                data: genre,
                meta: {
                    status: 200,
                    total: 1,
                    url: `/api/genres/${id}`
                }
            })

        } catch (error) {
            return createResponsesError(res, error)
        }

    },
    store: async (req, res) => {

        /* return res.send(req.body) */
        try {
            const newGenre = await createGenre(req.body);

            return res.status(200).json({
                ok: true,
                data: newGenre,
                meta: {
                    status: 200,
                    total: 1,
                    url: `/api/genres/${newGenre.id}`
                }
            })

        } catch (error) {
            return createResponsesError(res, error)
        }

    },
    update: async (req, res) => {

        try {

            const genre = await updateGenre(req.params.id, req.body)

            if (!genre) {
                throw {
                    status: 404,
                    message: "Genre not found"
                }
            }
            return res.status(200).json({
                ok: true,
                data: genre,
                meta: {
                    status: 200,
                    total: 1,
                    url: `/api/genres/${genre.id}`
                },
            })
        } catch (error) {
            return createResponseError(res, error)
        }
    },
    destroy: async (req, res) => {
        try {

            const genreDeleted = await destroyGenre(req.params.id)
            return res.status(200).json({
                ok: true,
                data: genreDeleted,
                meta: {
                    status: 200,
                    total: 1,
                    url: `/api/genres/${req.params.id}`
                },
            })
        } catch (error) {
            return createResponseError(res, error)
        }
    }

}

module.exports = genresController;