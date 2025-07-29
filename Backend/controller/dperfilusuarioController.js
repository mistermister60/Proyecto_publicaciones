
const controller = {};
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from dperfilusuario', (err, data) => {
            if (err) res.json(err);
            res.json(data);
        });
    });
};

controller.edit = (req, res) => {
    const { id_per } = req.params;
    req.getConnection((err, conn) => {
        conn.query('select * from dperfilusuario where id_per = ?', [id_per], (err, data) => {
            res.json(data[0]);
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('insert into dperfilusuario set ?', [data], (err, result) => {
            res.json(result);
        });
    });
};

controller.update = (req, res) => {
    const { id_per } = req.params;
    const updated = req.body;
    req.getConnection((err, conn) => {
        conn.query('update dperfilusuario set ? where id_per = ?', [updated, id_per], (err, result) => {
            res.json({ message: "Perfil de Usuario actualizado" });
        });
    });
};

controller.delete = (req, res) => {
    const { id_per } = req.params;
    req.getConnection((err, conn) => {
        conn.query('update dperfilusuario set estado = ? where id_per = ?', ['Inactivo',id_per], (err, result) => {
            res.json({ message: "Perfil de Usuario eliminado" });
        });
    });
};
module.exports =controller;