const crearUsuario = async (req, res) => {
  res.json({
    ok: true,
    msg: "New User",
  });
};

const login = async (req, res) => {
  res.json({
    ok: true,
    msg: "Login success",
  });
};

const renewToken = async (req, res) => {
  res.json({
    ok: true,
    msg: "Token Validated",
  });
};

module.exports = {
  crearUsuario,
  login,
  renewToken,
};
