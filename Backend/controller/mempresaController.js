
const controller = {};
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from mempresa', (err, data) => {
            if (err) res.json(err);
            res.json(data);
        });
    });
};

controller.edit = (req, res) => {
    const { Id_emp } = req.params;
    req.getConnection((err, conn) => {
        conn.query('select * from mempresa where Id_emp = ?', [Id_emp], (err, data) => {
            res.json(data[0]);
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('insert into mempresa set ?', [data], (err, result) => {
            res.json(result);
        });
    });
};

controller.update = (req, res) => {
    const { Id_emp } = req.params;
    const updated = req.body;
    req.getConnection((err, conn) => {
        conn.query('update mempresa set ? where Id_emp = ?', [updated, Id_emp], (err, result) => {
            res.json({ message: "Empresa actualizada" });
        });
    });
};

controller.delete = (req, res) => {
    const { Id_emp } = req.params;
    req.getConnection((err, conn) => {
        conn.query('update mempresa set estado = ? where Id_emp = ?', ['Inactivo',Id_emp], (err, result) => {
            res.json({ message: "Empresa eliminada" });
        });
    });
};
module.exports =controller;