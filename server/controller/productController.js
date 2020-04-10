module.exports = {
    addProduct: (req, res) => {
        const db = req.app.get('db')
        console.log(req.body)
        const { name, price, imgurl } = req.body
        db.addProduct(name, price, imgurl).then(product => {
            console.log("PRODUCT SUCCESSFULLY ADDED : ", product)
            res.sendStatus(200)
        }).catch(err => {
            console.log("ERROR: UNABLE TO INSERT PRODUCT----", err)
            res.status(500).send({ errMessage: 'Ooops: Unable to add your product at this moment' })
        })
    },
    getProducts: (req, res) => {
        const db = req.app.get('db')
        db.getProducts().then(products => {
            res.status(200).send(products)
        }).catch(err => {
            console.log("ERROR: UNABLE TO RETRIEVE PRODUCT----", err)
            res.status(500).send({ errMessage: 'Ooops: Unable to retrieve invertory at this moment' })
        })
    },
    deleteProduct: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        db.deleteProduct(id).then(() => res.sendStatus(200)).catch(err => {
            console.log("ERROR: UNABLE TO DELETE------", err)
            res.status(500).send(err)
        })
    },
    editProduct: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        const updatedProduct = { id, ...req.body }
        db.updateProduct(updatedProduct).then(() => res.sendStatus(200)).catch(err => {
            console.log("ERROR: UNABLE TO UPDATE------", err)
            res.status(500).send(err)
        })
    }
}