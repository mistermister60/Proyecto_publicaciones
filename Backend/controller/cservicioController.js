
const controller = {};
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from cservicio', (err, data) => {
            if (err) res.json(err);
            res.json(data);
        });
    });
};

controller.edit = (req, res) => {
    const { Id_serv } = req.params;
    req.getConnection((err, conn) => {
        conn.query('select * from cservicio where Id_serv = ?', [Id_serv], (err, data) => {
            res.json(data[0]);
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('insert into cservicio set ?', [data], (err, result) => {
            res.json(result);
        });
    });
};

controller.update = (req, res) => {
    const { Id_serv } = req.params;
    const updated = req.body;
    req.getConnection((err, conn) => {
        conn.query('update cservicio set ? where Id_serv = ?', [updated, IId_servd], (err, result) => {
            res.json({ message: "Servicio actualizado" });
        });
    });
};

controller.delete = (req, res) => {
    const { Id_serv } = req.params;
    req.getConnection((err, conn) => {
        conn.query('update cservicio set estado = ? where Id_serv = ?', ['Inactivo',Id_serv], (err, result) => {
            res.json({ message: "Servicio eliminado" });
        });
    });
};
module.exports =controller;