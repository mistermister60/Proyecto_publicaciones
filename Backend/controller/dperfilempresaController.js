
const controller = {};
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from deperfilempresa', (err, data) => {
            if (err) res.json(err);
            res.json(data);
        });
    });
};

controller.edit = (req, res) => {
    const { Id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('select * from deperfilempresa where Id_pemp = ?', [Id], (err, data) => {
            res.json(data[0]);
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('insert into deperfilempresa set ?', [data], (err, result) => {
            res.json(result);
        });
    });
};

controller.update = (req, res) => {
    const { Id } = req.params;
    const updated = req.body;
    req.getConnection((err, conn) => {
        conn.query('update deperfilempresa set ? where Id_pemp = ?', [updated, Id], (err, result) => {
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