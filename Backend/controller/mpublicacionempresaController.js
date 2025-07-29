
const controller = {};
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from mpublicacionempresa', (err, data) => {
            if (err) res.json(err);
            res.json(data);
        });
    });
};

controller.edit = (req, res) => {
    const { Id_pube } = req.params;
    req.getConnection((err, conn) => {
        conn.query('select * from mpublicacionempresa where Id_pube = ?', [Id_pube], (err, data) => {
            res.json(data[0]);
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('insert into mpublicacionempresa set ?', [data], (err, result) => {
            res.json(result);
        });
    });
};

controller.update = (req, res) => {
    const { Id_pube } = req.params;
    const updated = req.body;
    req.getConnection((err, conn) => {
        conn.query('update mpublicacionempresa set ? where Id_pube = ?', [updated, Id_pube], (err, result) => {
            res.json({ message: "Publicacion de Empresa actualizada" });
        });
    });
};

controller.delete = (req, res) => {
    const { Id_pube } = req.params;
    req.getConnection((err, conn) => {
        conn.query('update mpublicacionempresa set estado = ? where Id_pube = ?', ['Inactivo',Id_pube], (err, result) => {
            res.json({ message: "Publicacion de Empresa eliminada" });
        });
    });
};
module.exports =controller;