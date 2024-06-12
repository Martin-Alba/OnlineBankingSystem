export const ticketBelongsToUser = async (req, res, next) => {
  const { id } = req.params
  const { sessionId } = req.cookies

  try {
    console.log(`id: ${id}, sessionId: ${sessionId}`)
    if (id !== sessionId) return res.status(403).json({ message: 'Unauthorized' })

    next()
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error', error: err })
  }
}
