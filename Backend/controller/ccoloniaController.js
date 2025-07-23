
const controller = {};
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from ccolonia', (err, data) => {
            if (err) res.json(err);
            res.json(data);
        });
    });
};

controller.edit = (req, res) => {
    const { Id_Col } = req.params;
    req.getConnection((err, conn) => {
        conn.query('select * from ccolonia where Id_Col = ?', [Id_Col], (err, data) => {
            res.json(data[0]);
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('insert into ccolonia set ?', [data], (err, result) => {
            res.json(result);
        });
    });
};

controller.update = (req, res) => {
    const { Id_Col } = req.params;
    const updated = req.body;
    req.getConnection((err, conn) => {
        conn.query('update ccolonia set ? where Id_Col = ?', [updated, Id_Col], (err, result) => {
            res.json({ message: "Colonia actualizada" });
        });
    });
};

controller.delete = (req, res) => {
    const { Id_Col } = req.params;
    req.getConnection((err, conn) => {
        conn.query('update ccolonia set estado = ? where Id_Col = ?', ['Inactivo',Id_Col], (err, result) => {
            res.json({ message: "Colonia eliminada" });
        });
    });
};
module.exports =controller;