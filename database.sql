-- UNIQUE - свойство которое делает поле уникальным во всем столбце таблицы
-- Email CHARACTER VARYING(30) UNIQUE, как пример. Нужно сделать с мыслом
-- FOREIGN KEY (user_id) REFERENCES person (id)
-- user_id INTEGER,
-- sql lenguage Russian кодировка - \! chcp 1251
-- отчистить экран -  \! cls

DROP TABLE rooms, services, tariffs, payment_types, sessions, visitors, clients, deposits, deponents, sessions_rooms, visitors_services, users_roles, users, roles;
-- DataBase kamenka2
create TABLE users(
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    lastname text NOT NULL,
    email text NOT NULL UNIQUE,
    password text NOT NULL,
    phone VARCHAR(20) NOT NULL,
    token text,
    status text NOT NULL
);

create TABLE rooms(
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    color text
);

create TABLE services(
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    price NUMERIC NOT NULL
);

create TABLE tariffs(
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    metric text NOT NULL,
    duration INTEGER,
    cost INTEGER NOT NULL
);

create TABLE payment_types(
    id SERIAL PRIMARY KEY,
    type text NOT NULL
);

create TABLE sessions(
    id SERIAL PRIMARY KEY,
    booked_date timestamp with time zone NOT NULL,
    estimate_session_duration INTEGER NOT NULL,
    estimate_visitors_num INTEGER,
    start_time_session timestamp with time zone,
    end_time_session timestamp with time zone,
    -- tariff_id !!!!
    status text NOT NULL
);

create TABLE clients(
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    lastname text,
    number_phone text NOT NULL,
    status text
);

create TABLE visitors(
    id SERIAL PRIMARY KEY,
    session_id INTEGER NOT NULL,
    FOREIGN KEY (session_id) REFERENCES sessions (id),
    tariff_id INTEGER NOT NULL,
    FOREIGN KEY (tariff_id) REFERENCES tariffs (id),
    client_id INTEGER,
    FOREIGN KEY (client_id) REFERENCES clients (id),
    start_time_visitor timestamp with time zone,
    end_time_visitor timestamp with time zone,
    name text NOT NULL,
    status text NOT NULL
);

create TABLE deposits(
    id SERIAL PRIMARY KEY,
    visitor_id INTEGER NOT NULL,
    FOREIGN KEY (visitor_id) REFERENCES visitors (id),
    paymet_type_id INTEGER NOT NULL,
    FOREIGN KEY (paymet_type_id) REFERENCES payment_types (id),
    client_id INTEGER NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients (id),
    value FLOAT NOT NULL
);

create TABLE deponents(
    id SERIAL PRIMARY KEY,
    visitor_id INTEGER NOT NULL,
    FOREIGN KEY (visitor_id) REFERENCES visitors (id),
    client_id INTEGER NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients (id),
    value FLOAT NOT NULL,
    status text NOT NULL
);

create TABLE visitors_services(
    id SERIAL PRIMARY KEY,
    visitor_id INTEGER NOT NULL,
    FOREIGN KEY (visitor_id) REFERENCES visitors (id),
    service_id INTEGER NOT NULL,
    FOREIGN KEY (service_id) REFERENCES services (id)
);

create TABLE sessions_rooms(
    id SERIAL PRIMARY KEY,
    room_id INTEGER NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms (id),
    session_id INTEGER NOT NULL,
    FOREIGN KEY (session_id) REFERENCES sessions (id)
);