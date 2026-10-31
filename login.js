// Endpoint de login do CTF.
// De propósito, NÃO há rate limiting, bloqueio de IP, captcha ou delay artificial —
// a ideia é justamente permitir testes de força bruta contra ele.

// Credenciais "alvo". Troque aqui pelo usuário/senha que você quer que o
// bruteforce descubra.
const VALID_USERNAME = "admin";
const VALID_PASSWORD = "flag{ctf_senha_fraca_123}";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ success: false, message: "Método não permitido" });
  }

  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Usuário e senha são obrigatórios" });
  }

  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    return res.status(200).json({ success: true, message: "Acesso concedido! Flag capturada." });
  }

  return res.status(401).json({ success: false, message: "Credenciais inválidas" });
}
