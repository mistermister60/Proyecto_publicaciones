
const controller = {};
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from epublicacion', (err, data) => {
            if (err) res.json(err);
            res.json(data);
        });
    });
};

controller.edit = (req, res) => {
    const { Id_Pub } = req.params;
    req.getConnection((err, conn) => {
        conn.query('select * from epublicacion where Id_Pub = ?', [Id_Pub], (err, data) => {
            res.json(data[0]);
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('insert into epublicacion set ?', [data], (err, result) => {
            res.json(result);
        });
    });
};

controller.update = (req, res) => {
    const { Id_Pub } = req.params;
    const updated = req.body;
    req.getConnection((err, conn) => {
        conn.query('update epublicacion set ? where Id_Pub = ?', [updated, Id_Pub], (err, result) => {
            res.json({ message: "Publicacion actualizado" });
        });
    });
};

controller.delete = (req, res) => {
    const { Id_Pub } = req.params;
    req.getConnection((err, conn) => {
        conn.query('update epublicacion set estado = ? where Id_Pub = ?', ['Inactivo',Id_Pub], (err, result) => {
            res.json({ message: "Publicacion eliminado" });
        });
    });
};
module.exports =controller;