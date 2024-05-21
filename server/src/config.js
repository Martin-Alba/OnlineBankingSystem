import { ensureUserFileExists } from './utils/utils.js'

const PORT = process.env.PORT || 3000

export const startServer = async (app) => {
  try {
    await ensureUserFileExists()
    app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error(`Error startServer: ${err}`)
  }
}
