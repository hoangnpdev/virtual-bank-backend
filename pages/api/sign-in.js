import {v4 as uuid} from 'uuid'

export default (req, res) => {
    // todo
    let session = uuid()
    res.status(200).json({ session: session});
}