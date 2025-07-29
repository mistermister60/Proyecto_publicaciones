
const controller = {};
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from musuario', (err, data) => {
            if (err) res.json(err);
            res.json(data);
        });
    });
};

controller.edit = (req, res) => {
    const { Id_usu } = req.params;
    req.getConnection((err, conn) => {
        conn.query('select * from musuario where Id_usu = ?', [Id_usu], (err, data) => {
            res.json(data[0]);
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('insert into musuario set ?', [data], (err, result) => {
            res.json(result);
        });
    });
};

controller.update = (req, res) => {
    const { Id_usu } = req.params;
    const updated = req.body;
    req.getConnection((err, conn) => {
        conn.query('update musuario set ? where Id_usu = ?', [updated, Id_usu], (err, result) => {
            res.json({ message: "Usuario actualizado" });
        });
    });
};

controller.delete = (req, res) => {
    const { Id_usu } = req.params;
    req.getConnection((err, conn) => {
        conn.query('update musuario set estado = ? where Id_usu = ?', ['Inactivo',Id_usu], (err, result) => {
            res.json({ message: "Usuario eliminado" });
        });
    });
};
module.exports =controller;