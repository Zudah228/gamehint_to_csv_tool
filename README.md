# gamehint csv
Gamehint で出力した参加者リストから、Challonge に登録する。

## 環境
```markdown
NodeJS: 16.x
JavaScript: es2022
TypeScript: 4.7.x
```

## 実行手順
必要環境 npm

1. npm のセットアップ
    ```
    cd {プロジェクトのルートディレクトリ}
    npm i
    npm run build
    ```

2. `_import` フォルダに、出力する Gamehint の CSV ファイルを置く

3. Challonge の API Key を設定する
プロジェクトのルートディレクトリに、以下の情報を記入した、 `.env` という名前のファイルを追加する。
API Key の文字列は、Challonge の自分のアカウントから確認できる。
[リンク](https://challonge.com/ja/settings/developer)（変わっている可能性あり）。

    ```
    CHALLONGE_API_KEY=取得したAPIキー
    ```

4. スクリプトを実行する。

    **Mac の場合**
    ```
    sh sh/start.sh
    ```

    **Windows の場合**

    未対応
