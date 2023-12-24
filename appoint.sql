-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- ホスト: 127.0.0.1
-- 生成日時: 2023-12-24 15:36:01
-- サーバのバージョン： 10.4.28-MariaDB
-- PHP のバージョン: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `appoint`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `m_customer`
--

CREATE TABLE `m_customer` (
  `customer_id` varchar(7) NOT NULL,
  `customer_sei` varchar(20) NOT NULL,
  `customer_mei` varchar(20) NOT NULL,
  `customer_birth` date NOT NULL,
  `customer_address` varchar(255) NOT NULL,
  `customer_tel` varchar(15) NOT NULL,
  `customer_mail` varchar(255) NOT NULL,
  `customer_sei_yomi` varchar(20) NOT NULL,
  `customer_mei_yomi` varchar(20) NOT NULL,
  `costomer_prefecture` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `m_prefecturecd`
--

CREATE TABLE `m_prefecturecd` (
  `pref_cd` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `prefecture` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- テーブルのデータのダンプ `m_prefecturecd`
--

INSERT INTO `m_prefecturecd` (`pref_cd`, `prefecture`) VALUES
('pref24', '三重県'),
('pref26', '京都府'),
('pref41', '佐賀県'),
('pref28', '兵庫県'),
('pref01', '北海道'),
('pref12', '千葉県'),
('pref30', '和歌山県'),
('pref11', '埼玉県'),
('pref44', '大分県'),
('pref27', '大阪府'),
('pref29', '奈良県'),
('pref04', '宮城県'),
('pref45', '宮崎県'),
('pref16', '富山県'),
('pref35', '山口県'),
('pref06', '山形県'),
('pref19', '山梨県'),
('pref21', '岐阜県'),
('pref33', '岡山県'),
('pref03', '岩手県'),
('pref32', '島根県'),
('pref34', '広島県'),
('pref36', '徳島県'),
('pref38', '愛媛県'),
('pref23', '愛知県'),
('pref15', '新潟県'),
('pref13', '東京都'),
('pref09', '栃木県'),
('pref47', '沖縄県'),
('pref25', '滋賀県'),
('pref43', '熊本県'),
('pref17', '石川県'),
('pref14', '神奈川県'),
('pref18', '福井県'),
('pref40', '福岡県'),
('pref07', '福島県'),
('pref05', '秋田県'),
('pref10', '群馬県'),
('pref08', '茨城県'),
('pref42', '長崎県'),
('pref20', '長野県'),
('pref02', '青森県'),
('pref22', '静岡県'),
('pref37', '香川県'),
('pref39', '高知県'),
('pref31', '鳥取県'),
('pref46', '鹿児島県');

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `m_prefecturecd`
--
ALTER TABLE `m_prefecturecd`
  ADD PRIMARY KEY (`pref_cd`),
  ADD UNIQUE KEY `prefecture` (`prefecture`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
