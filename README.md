# うちの家電＋
## （UCHI NO KADEN PLUS）

## アプリ概要
前回プロダクト「うちの家電」から継続機能
- うちにある家電・電化製品を情報集約する
- 自分が所有している家電のうち、経過年数が１０年を超えているものが分かる

今回プロダクトの追加機能
- 操作画面をモバイル向けに全面リニューアル
- 全ての家電の使用者の声を、家電ごとにコメント閲覧できる
- 使用者は、所有している家電にのみコメント投稿できる

## 使用技術
- フロントエンド：React(vite)
- バックエンド：kotlin(SpringBoot)

## 環境構築
| ディレクトリ      | command           | 実行内容                               | 元のコマンド                                                              |
| :---------------- | :---------------- | :------------------------------------- | :------------------------------------------------------------------------ |
| my-home-appliance2 | createdb my_home_appliance2  | 端末のローカル環境にデータベースを作成         |                                                                 |
| /frontend          | npm i             | 必要なパッケージのインストール         |                                                                           |
| /frontend          | npm run build     | ビルド                                 | vite build                                                                |
| my-home-appliance2 | ./gradlew bootrun             | バックエンドサーバー起動 <br> （テスト起動、マイグレーション・シード適用を含む）         |                                                                           |
http://localhost:8081/

## データベース my_home_appliance2

### テーブル appliance
役割：家電名称・型番情報を保持
![image](https://github.com/ngtnok/my-home-appliance2/assets/105690483/9b82f3cf-e1a5-4f25-a4b9-c2884fc1fe55)
### テーブル maker
役割：メーカー名称を保持
![image](https://github.com/ngtnok/my-home-appliance2/assets/105690483/4fc74610-d469-4913-8fd1-c4290388fb6a)

### テーブル category
役割：家電分類・耐用年数の目安を保持
![image](https://github.com/ngtnok/my-home-appliance2/assets/105690483/7c02e188-4227-40dc-87dc-2d03ccb3d2f7)

### テーブル use_place
役割：使用場所を保持
![image](https://github.com/ngtnok/my-home-appliance2/assets/105690483/cee9e6e2-60bc-4b63-85a2-7d80ed240fe2)

### テーブル family_to_appliance
役割：結合テーブル
![image](https://github.com/ngtnok/my-home-appliance2/assets/105690483/8aaec200-bd00-4ec0-872d-fc5ce3bec5c8)

### テーブル history
役割：家電ごとのコメントを保持
![image](https://github.com/ngtnok/my-home-appliance2/assets/105690483/c6d137d3-b6c4-4419-8423-634e65db2e68)
