 AtCoder Problems にてサポートされている [API](https://github.com/kenkoooo/AtCoderProblems/blob/master/doc/api.md) を外部から利用するためのライブラリです。[atcoder-tasks-page-colorizer](https://greasyfork.org/ja/scripts/380404-atcoder-tasks-page-colorizer) のために開発されたもので、積極的な仕様変更への追従は保証しません。もちろん、contribution は歓迎です。

# 機能

 - 2022 年 1 月 1 日現在に公式の [API](https://github.com/kenkoooo/AtCoderProblems/blob/master/doc/api.md) ページで紹介されているものの実装
 - Submissions API で取得した情報の Indexed DB へのキャッシュ

# 注意

`getSubmissions` はローカルに情報をキャッシュ（保存）しているため、提出毎に数百バイトの記憶領域を使用します。そのため、数千ユーザー単位の情報を取得するような使い方をした場合は数 GB の容量を使用してしまうことも考えられます。なので、順位表に表示されたユーザー全員について `getSubmissions` を叩くといった使用方法は推奨しません。
