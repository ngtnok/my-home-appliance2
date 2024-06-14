# うちの家電＋
## （UCHI NO KADEN PLUS）

## アプリ概要
前プロダクト「うちの家電」から継続機能
- 自分が所有している家電のうち、経過年数が１０年を超えているものが分かる
今回の追加機能
- 全ての家電の使用者の声を、家電ごとにコメント閲覧できる
- 使用者は、所有している家電にのみコメント投稿できる

## 使用技術
- フロントエンド：React(vite)
- バックエンド：SpringBoot(kotlin)

## 環境構築
createdb my_home_appliance2
npm i --prefix frontend && npm run build --prefix frontend

## データベース my_home_appliance2

### appliance
役割：家電名称・型番情報を保持
### maker
役割：メーカー名称を保持
### category
役割：家電分類・耐用年数の目安を保持
### use_place
役割：使用場所を保持
### family_to_appliance
役割：結合テーブル
### history
役割：家電ごとのコメントを保持
