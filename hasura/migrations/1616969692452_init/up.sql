CREATE TABLE IF NOT EXISTS games (
	id uuid primary key default gen_random_uuid(),
	creator varchar(42) unique not null,
	contract varchar(42) unique,
	created_at timestamptz default now(),
	updated_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS players (
	id uuid primary key default gen_random_uuid(),
	game_id uuid not null,
	address varchar(42) not null,
	score int default 0,
	created_at timestamptz default now(),
	updated_at timestamptz default now(),
	FOREIGN KEY (game_id) references games (id) on delete cascade
);
