const router = require("express").Router();
const {nanoid} = require("nanoid");
const Link = require("../models/Links");



const createRouter = () => {
    router.get("/:shortUrl", async (req, res) => {
        try {
            const result = await Link.findOne({ shortUrl: req.params.shortUrl});
            if (result) {
                res.status(301).redirect(result.originalUrl)
            } else {
                res.sendStatus(404);
            }
        } catch {
            res.sendStatus(500);
        }
    });

    router.post("/", async (req, res) => {
        const linkData = req.body;
        linkData.shortUrl = nanoid(7);

        const link = new Link(linkData);
        try{
            await link.save();
        } catch (e) {
            res.status(400).send(e);
            console.log(e)
        }
        res.send(link);
    });
    return router;
};

module.exports = createRouter;