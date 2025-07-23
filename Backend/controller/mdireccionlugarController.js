
const controller = {};
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from mdireccionlugar', (err, data) => {
            if (err) res.json(err);
            res.json(data);
        });
    });
};

controller.edit = (req, res) => {
    const { Id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('select * from mdireccionlugar where Id_Dr = ?', [Id], (err, data) => {
            res.json(data[0]);
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('insert into mdireccionlugar set ?', [data], (err, result) => {
            res.json(result);
        });
    });
};

controller.update = (req, res) => {
    const { Id } = req.params;
    const updated = req.body;
    req.getConnection((err, conn) => {
        conn.query('update mdireccionlugar set ? where Id_Dr = ?', [updated, Id], (err, result) => {
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