CREATE TABLE users(
    id int(255) auto_increment not null,
    nombre varchar(100) not null,
    apellido varchar(100) not null,
    username varchar(100) not null,
    email varchar(255) not null,
    password varchar(255) not null
    CONSTRAINT pk_users PRIMARY KEY(id)
);

CREATE TABLE products(
    id int(255) auto_increment not null,
    nombre varchar(255) not null,
    id_categoria int(255) not null,
    descripcion text not null,
    precio int(15) not null;
    urlImage varchar(255) not null,
    fecha DATE not null,
    hora time not null,
    id_user int(255) not null,
    CONSTRAINT pk_product PRIMARY KEY(id),
    CONSTRAINT fk_product_users FOREIGN KEY(id_user) REFERENCES users(id),
    CONSTRAINT fk_product_categoria FOREIGN key(id_categoria) REFERENCES categorias(id)
);

CREATE TABLE categorias(
    id int(255) auto_increment not null,
    categoria varchar(255) not null,
    CONSTRAINT pk_categorias PRIMARY KEY(id)
);

CREATE TABLE comments(
    id_comment auto_increment not null,
    comment text not null,
    hora_comment time not null,
    fecha_comment DATE not null,
    id_product int(255) not null,
    id_user int(255) not null,
    CONSTRAINT pk_comment PRIMARY KEY(id_comment),
    CONSTRAINT fk_comment_product FOREIGN KEY(id_product) REFERENCES products(id),
    CONSTRAINT fk_comment_user FOREIGN KEY(id_user) REFERENCES users(id)
);

SELECT * FROM materias, carreras WHERE (materias.semestre = 3 AND materias.carrera_id = carreras.id_carrera)

CREATE TABLE carrito(
    id_carrito int(255) auto_increment not null,
    id_user int(255) not null,
    id_product int(255) not null,
    fecha_carrito DATETIME not null,
    CONSTRAINT pk_carrito PRIMARY KEY(id_carrito),
    CONSTRAINT fk_carrito_user FOREIGN KEY(id_user) REFERENCES users(id),
    CONSTRAINT fk_carrito_product FOREIGN KEY(id_product) REFERENCES products(id)
);

CREATE TABLE notifications(
    id_notificacion int(255) auto_increment not null,
    emitido int(200) not null,
    receptor int(255) not null,
    evento varchar(255) not null,
    fecha_evento DATETIME not null,
    CONSTRAINT pk_notifications PRIMARY KEY(id_notificacion),
    CONSTRAINT fk_notifications_user FOREIGN KEY(emitido) REFERENCES users(id),
    CONSTRAINT fk_notifications_users FOREIGN KEY(receptor) REFERENCES users(id),
);

CREATE TABLE history(
id_historia INT(255) AUTO_INCREMENT,
id_user INT(255) NOT NULL,
id_pructo INT(255) NOT NULL,
accion varchar(255) NOT NULL,
fecha_historia DATE NOT NUL,
hora_historia TIME NOT NULL    
)