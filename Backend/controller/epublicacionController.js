
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
    const { Id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('select * from epublicacion where Id_Pub = ?', [Id], (err, data) => {
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
    const { Id } = req.params;
    const updated = req.body;
    req.getConnection((err, conn) => {
        conn.query('update epublicacion set ? where Id_Pub = ?', [updated, Id], (err, result) => {
            res.json({ message: "Servicio actualizado" });
        });
    });
};

controller.delete = (req, res) => {
    const { Id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('update cservicio set estado = ? where Id_serv = ?', ['Inactivo',Id], (err, result) => {
            res.json({ message: "Servicio eliminado" });
        });
    });
};
module.exports =controller;