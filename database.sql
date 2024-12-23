

/*  

select * from breed;
insert into breed(name,description) values('rotwailer','holalalalal') RETURNING id;
*/
--DROP TABLE persona;

-- Crear ENUM para los valores fijos de sexo y rol
CREATE TYPE sexo_enum AS ENUM ('masculino', 'femenino', 'otro');
CREATE TYPE rol_enum AS ENUM ('cliente', 'empleado', 'vet');

-- Crear la tabla turno
CREATE TABLE turno (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    hora_ini VARCHAR(10) NOT NULL,
    hora_fin VARCHAR(10) NOT NULL
);
/*  

INSERT INTO turno(nombre,hora_ini,hora_fin) VALUES($1,$2,$3)
select  * from turno;
*/



-- Crear la tabla persona
CREATE TABLE persona (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,  -- Reduce el tamaño a 100
    direccion VARCHAR(150) NOT NULL,  -- Tamaño ajustado para dirección
    celular VARCHAR(20) UNIQUE NOT NULL,  -- El celular es único
    correo VARCHAR(100) UNIQUE NOT NULL,  -- El correo también debe ser único
    sexo sexo_enum NOT NULL,  -- Usamos ENUM para sexo
    rol rol_enum NOT NULL,  -- Usamos ENUM para rol
    CONSTRAINT rol_check CHECK (rol IN ('cliente', 'empleado', 'vet'))
);

/* 
-- insertando datos en la tabla
insert into persona(nombre,direccion,celular,correo,sexo,rol) 
	values ('tokio shakura','montero','77000001','tokio@gmail.com','masculino','cliente'),
			('shaske uchija','warnes','77000002','shaske@gmail.com','masculino','cliente');
*/



-- Crear la tabla cliente (con el campo nit)
CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    id_persona INT NOT NULL,
    nit VARCHAR(20) UNIQUE NOT NULL,  -- Agregar el campo NIT, asegurando que sea único
    fecha_reg DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (id_persona) REFERENCES persona(id) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE (id_persona)  -- Un cliente solo puede tener una persona asociada
);

-- insertando datos en tabla cliente
/*  
insert into cliente(id_persona,nit) values(1,'40020');
											(2,'303030');
*/	


/* 
SELECT p.*, c.nit, c.fecha_reg
FROM persona p
JOIN cliente c ON p.id = c.id_persona
WHERE p.rol = 'cliente';

select p.* , c.nit , c.fecha_reg
from persona p , cliente c
where c.id_persona = p.id and p.rol='cliente'
order by p.id asc;

*/




-- Crear la tabla empleado
CREATE TABLE empleado (
    id SERIAL PRIMARY KEY,
    id_persona INT NOT NULL,
    fecha_reg DATE DEFAULT CURRENT_DATE,
    id_turno INT,
    FOREIGN KEY (id_persona) REFERENCES persona(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_turno) REFERENCES turno(id) ON DELETE SET NULL ON UPDATE CASCADE,
    UNIQUE (id_persona)  -- Un empleado solo puede tener una persona asociada
);

/*
select p.* , e.fecha_reg, t.nombre as turno
from persona p , empleado e , turno t
where e.id_persona = p.id and p.rol='empleado' and e.id_turno = t.id
order by p.id asc;

select * from empleado;
select * from persona;
*/


-- Crear la tabla especie
CREATE TABLE especie (
    id SERIAL PRIMARY KEY,  -- ID auto incremental
    nombre VARCHAR(100) NOT NULL,  -- Nombre de la especie
    descripcion VARCHAR(255)  -- Descripción de la especie
);


-- Crear la tabla raza
CREATE TABLE raza (
    id SERIAL PRIMARY KEY,  -- ID auto incremental
    id_especie INT NOT NULL,  -- ID de la especie (clave foránea)
    nombre VARCHAR(100) NOT NULL,  -- Nombre de la raza
    descripcion VARCHAR(255),  -- Descripción de la raza
    FOREIGN KEY (id_especie) REFERENCES especie(id) ON DELETE CASCADE ON UPDATE CASCADE  -- Relación con especie
);


--trae los datos para mostrar
/* 
SELECT r.*,e.nombre as especie
	FROM raza r ,especie e
	WHERE r.id_especie = e.id
	ORDER BY r.id;
*/



-- Crear la tabla mascota
CREATE TABLE mascota (
    id SERIAL PRIMARY KEY,  -- ID auto incremental
    id_cliente INT NOT NULL,  -- ID del cliente (clave foránea)
    id_raza INT NOT NULL,  -- ID de la raza (clave foránea)
    nombre VARCHAR(100) NOT NULL,  -- Nombre de la mascota
    edad VARCHAR(50) NOT NULL,  -- Nombre de la mascota
    fecha_reg DATE DEFAULT CURRENT_DATE,  -- Fecha de registro
    sexo VARCHAR(6) CHECK (sexo IN ('hembra', 'macho')) NOT NULL,  -- Sexo de la mascota (hembra o macho)
    color VARCHAR(50),  -- Color de la mascota
    FOREIGN KEY (id_cliente) REFERENCES cliente(id) ON DELETE CASCADE ON UPDATE CASCADE,  -- Relación con cliente
    FOREIGN KEY (id_raza) REFERENCES raza(id) ON DELETE CASCADE ON UPDATE CASCADE  -- Relación con raza
);



--drop table mascota;

	
/* 
select table_name
from information_schema.tables
where table_schema= 'public';
*/

SELECT ma.* , pe.nombre as cliente ,  ra.nombre as raza , es.nombre as especie
FROM persona pe , cliente cl , raza ra , especie es, mascota ma
WHERE pe.rol= 'cliente' and cl.id_persona = pe.id and ra.id_especie = es.id and
	ma.id_cliente =cl.id and ma.id_raza =ra.id;
	
select * from especie order by id;
select * from raza order by id;
select pe.*, cl.id_persona as id_persona from persona pe,cliente cl where rol='cliente' and cl.id_persona = pe.id;



CREATE TABLE historia_clinica (
    id SERIAL PRIMARY KEY,  -- ID auto incremental
    id_mascota INT NOT NULL,  -- ID de la mascatoa (clave foránea)
    fecha_reg DATE DEFAULT CURRENT_DATE ,  -- fecha de registro
    num_hc VARCHAR(10) NOT NULL,  -- numero historia de la de la historia clinica
    FOREIGN KEY (id_mascota) REFERENCES mascota(id) ON DELETE CASCADE ON UPDATE CASCADE  -- Relación con especie
);


SELECT hc.*,ma.nombre as mascota,pe.nombre as cliente, pe.id as id_cliente, ra.nombre as raza, ma.edad
FROM historia_clinica hc ,mascota ma,cliente cl,persona pe ,raza ra
WHERE ma.id = hc.id_mascota AND ma.id_cliente=cl.id AND cl.id_persona=pe.id AND ma.id_raza = ra.id
ORDER BY hc.fecha_reg;

select * from cliente;

CREATE TABLE consulta (
    id SERIAL PRIMARY KEY,
    id_hc INT NOT NULL,
    id_empleado INT NOT NULL,
    fecha_reg DATE DEFAULT CURRENT_DATE NOT NULL,
    peso VARCHAR(5) NOT NULL, -- peso en kg
    temperatura VARCHAR(5) NOT NULL, -- Temperatura en grados Celsius °C
    motivo TEXT NOT NULL,
    diagnostico TEXT NOT NULL,
    tratamiento TEXT NOT NULL,
    precio DECIMAL(10,2) NOT NULL DEFAULT 0.00, -- Nuevo campo para el precio
    FOREIGN KEY (id_hc) REFERENCES historia_clinica(id),
    FOREIGN KEY (id_empleado) REFERENCES empleado(id)
);





SELECT co.*,hc.num_hc ,pe.nombre AS veterinario
	      FROM persona pe,empleado em, historia_clinica hc, consulta co
	      WHERE co.id_hc =hc.id and em.id=co.id_empleado and pe.id = (select id_persona from empleado where  co.id_empleado =id)
	      ORDER BY co.id ;
SELECT co.id_empleado,hc.num_hc ,pe.nombre AS veterinario
	      FROM persona pe,empleado em, historia_clinica hc, consulta co
	      WHERE co.id_hc =hc.id and em.id=co.id_empleado and pe.id = (select id_persona from empleado where  co.id_empleado =id)
	      ORDER BY co.id ;

SELECT e.id , e.id_persona , co.id_empleado FROM empleado e , consulta co;




select * from  historia_clinica;
select * from persona;
select * from empleado;
select * from consulta;
select * from raza;

select co.*, em.id_persona from consulta co, empleado em;


select * from mascota;


