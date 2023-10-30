const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const port = 3000;
const mysql = require('mysql2');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// expressdb MySQL接続情報
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootroot',
  database: 'postboard_db'
});

//DB接続
con.connect((err) => {
  if (err) {
    console.error('データベースへの接続に失敗しました: ' + err.message);
  } else {
    console.log('データベースに接続しました');
    // ここでクエリを実行できます
  }
});

// cssファイルの取得
app.use(express.static('assets'));
app.use(express.static(path.join(__dirname, 'public')));

// クライアントからログインリクエストを受け取るエンドポイント
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // クライアントから受け取ったIDとパスワードをデータベースと照合
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  con.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('データベースエラー：' + err.message);
      return res.status(500).json({ error: 'サーバーエラー' });
    }

    if (results.length === 0) {
      // ログイン情報が一致しない場合
      return res.status(401).json({ error: 'IDとパスワードが一致しません' });
    }

    const username = results[0].username;
    console.log(username);

    // ログイン成功
    res.status(200).json({ message: 'ログイン成功', username: username});
  });
});

//login.htmlに遷移
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/login.html'));
});
//index.htmlに遷移
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/index.html'));
});
//sign_up.htmlに遷移
app.get('/sign_up.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/sign_up.html'));
});

// ユーザー一覧を表示するエンドポイント
app.get('/', (req, res) => {
  const sql = "SELECT * FROM users";

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.render('index', {
      users: result
    });
  });
});

app.post('/', (req, res) => {
  const sql = "INSERT INTO users SET ?"
  con.query(sql, req.body, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.redirect('/');
  });
});

app.get('/create', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/index.html'))
});

app.get('/edit/:id', (req, res) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  con.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    res.render('edit', {
      user: result
    });
  });
});

app.post('/update/:id', (req, res) => {
  console.log(req.params.id);
  const sql = "UPDATE users SET ? WHERE id = " + req.params.id;
  con.query(sql, req.body, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.redirect('/');
  });
});

app.get('/delete/:id', (req, res) => {
  const sql = "DELETE FROM users WHERE id = ?";
  con.query(
    sql, [req.params.id],
    function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.redirect('/');
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
