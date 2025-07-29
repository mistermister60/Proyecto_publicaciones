
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
    const { Id_Dr } = req.params;
    req.getConnection((err, conn) => {
        conn.query('select * from mdireccionlugar where Id_Dr = ?', [Id_Dr], (err, data) => {
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
    const { Id_Dr } = req.params;
    const updated = req.body;
    req.getConnection((err, conn) => {
        conn.query('update mdireccionlugar set ? where Id_Dr = ?', [updated, Id_Dr], (err, result) => {
            res.json({ message: "Direccion actualizada" });
        });
    });
};

controller.delete = (req, res) => {
    const { Id_Dr } = req.params;
    req.getConnection((err, conn) => {
        conn.query('update mdireccionlugar set estado = ? where Id_Dr = ?', ['Inactivo',Id_Dr], (err, result) => {
            res.json({ message: "Direccion eliminada" });
        });
    });
};
module.exports =controller;