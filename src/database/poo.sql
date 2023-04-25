-- Active: 1682458107559@@127.0.0.1@3306
CREATE TABLE videos (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    title TEXT NOT NULL,
    duration REAL NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

DROP TABLE videos;

INSERT INTO videos (id, title, duration)
VALUES 
("001", "ComeBack", 1.20),
("002", "Throw", 1.50);