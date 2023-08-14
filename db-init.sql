

-- SEQUENCE: public.role_id_seq

-- DROP SEQUENCE IF EXISTS public.role_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.role_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;
    -- OWNED BY role.id;

ALTER SEQUENCE public.role_id_seq
    OWNER TO postgres;


-- SEQUENCE: public.user_id_seq

-- DROP SEQUENCE IF EXISTS public.user_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.user_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;
    -- OWNED BY "user".id;

ALTER SEQUENCE public.user_id_seq
    OWNER TO postgres;


-- SEQUENCE: public.color_id_seq

-- DROP SEQUENCE IF EXISTS public.color_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.color_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;
    -- OWNED BY color.id;

ALTER SEQUENCE public.color_id_seq
    OWNER TO postgres;


-- SEQUENCE: public.size_id_seq

-- DROP SEQUENCE IF EXISTS public.size_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.size_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;
    -- OWNED BY size.id;

ALTER SEQUENCE public.size_id_seq
    OWNER TO postgres;


-- SEQUENCE: public.product_id_seq

-- DROP SEQUENCE IF EXISTS public.product_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.product_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;
    -- OWNED BY product.id;

ALTER SEQUENCE public.product_id_seq
    OWNER TO postgres;


-- SEQUENCE: public.image_id_seq

-- DROP SEQUENCE IF EXISTS public.image_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.image_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;
    -- OWNED BY image.id;

ALTER SEQUENCE public.image_id_seq
    OWNER TO postgres;


-- SEQUENCE: public.product_options_id_seq

-- DROP SEQUENCE IF EXISTS public.product_options_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.product_options_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;
    -- OWNED BY product_options.id;

ALTER SEQUENCE public.product_options_id_seq
    OWNER TO postgres;





-- Table: public.role

-- DROP TABLE IF EXISTS public.role;

CREATE TABLE IF NOT EXISTS public.role
(
    id integer NOT NULL DEFAULT nextval('role_id_seq'::regclass),
    role character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.role
    OWNER to postgres;


-- Table: public.user

-- DROP TABLE IF EXISTS public."user";

CREATE TABLE IF NOT EXISTS public."user"
(
    id integer NOT NULL DEFAULT nextval('user_id_seq'::regclass),
    "firstName" character varying COLLATE pg_catalog."default" NOT NULL,
    "lastName" character varying COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id),
    CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."user"
    OWNER to postgres;



-- Table: public.users_roles

-- DROP TABLE IF EXISTS public.users_roles;

CREATE TABLE IF NOT EXISTS public.users_roles
(
    "userId" integer NOT NULL,
    "roleId" integer NOT NULL,
    CONSTRAINT "PK_a472bd14ea5d26f611025418d57" PRIMARY KEY ("userId", "roleId"),
    CONSTRAINT "FK_4fb14631257670efa14b15a3d86" FOREIGN KEY ("roleId")
        REFERENCES public.role (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "FK_776b7cf9330802e5ef5a8fb18dc" FOREIGN KEY ("userId")
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users_roles
    OWNER to postgres;
-- Index: IDX_4fb14631257670efa14b15a3d8

-- DROP INDEX IF EXISTS public."IDX_4fb14631257670efa14b15a3d8";

CREATE INDEX IF NOT EXISTS "IDX_4fb14631257670efa14b15a3d8"
    ON public.users_roles USING btree
    ("roleId" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: IDX_776b7cf9330802e5ef5a8fb18d

-- DROP INDEX IF EXISTS public."IDX_776b7cf9330802e5ef5a8fb18d";

CREATE INDEX IF NOT EXISTS "IDX_776b7cf9330802e5ef5a8fb18d"
    ON public.users_roles USING btree
    ("userId" ASC NULLS LAST)
    TABLESPACE pg_default;





-- Table: public.color

-- DROP TABLE IF EXISTS public.color;

CREATE TABLE IF NOT EXISTS public.color
(
    id integer NOT NULL DEFAULT nextval('color_id_seq'::regclass),
    color character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_d15e531d60a550fbf23e1832343" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.color
    OWNER to postgres;





-- Table: public.size

-- DROP TABLE IF EXISTS public.size;

CREATE TABLE IF NOT EXISTS public.size
(
    id integer NOT NULL DEFAULT nextval('size_id_seq'::regclass),
    size character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_66e3a0111d969aa0e5f73855c7a" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.size
    OWNER to postgres;


-- Table: public.product

-- DROP TABLE IF EXISTS public.product;

CREATE TABLE IF NOT EXISTS public.product
(
    id integer NOT NULL DEFAULT nextval('product_id_seq'::regclass),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    "descriptionHtml" character varying COLLATE pg_catalog."default" NOT NULL,
    price integer NOT NULL,
    CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product
    OWNER to postgres;


-- Table: public.image

-- DROP TABLE IF EXISTS public.image;

CREATE TABLE IF NOT EXISTS public.image
(
    id integer NOT NULL DEFAULT nextval('image_id_seq'::regclass),
    url character varying COLLATE pg_catalog."default" NOT NULL,
    "altText" character varying COLLATE pg_catalog."default" NOT NULL,
    "productId" integer NOT NULL,
    CONSTRAINT "PK_7eaa707a61c910531f9915b00aa" PRIMARY KEY (id, "productId"),
    CONSTRAINT "FK_c6eb61588205e25a848ba6105cd" FOREIGN KEY ("productId")
        REFERENCES public.product (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.image
    OWNER to postgres;


-- Table: public.product_options

-- DROP TABLE IF EXISTS public.product_options;

CREATE TABLE IF NOT EXISTS public.product_options
(
    id integer NOT NULL DEFAULT nextval('product_options_id_seq'::regclass),
    "productId" integer NOT NULL,
    quantity integer NOT NULL,
    "sizeId" integer NOT NULL,
    "colorId" integer NOT NULL,
    CONSTRAINT "PK_82f80160974c7b2ae6307b2d802" PRIMARY KEY (id, "productId", "sizeId", "colorId"),
    CONSTRAINT "FK_4add7dd745551ce80439cfe5ffb" FOREIGN KEY ("colorId")
        REFERENCES public.color (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "FK_96d8f73d05e681974c07b99ee5d" FOREIGN KEY ("productId")
        REFERENCES public.product (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "FK_9ad0fb8e3ec5c4ff21da3c662c0" FOREIGN KEY ("sizeId")
        REFERENCES public.size (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_options
    OWNER to postgres;






INSERT INTO public.role(
	id, role)
	VALUES (1, 'ADMIN'),(2, 'CUSTOMER');

INSERT INTO public."user"(
	id, "firstName", "lastName", email, password)
	VALUES
    (1, 'Nastia', 'Hlushchuk', 'nastia@gmail.com', '$2b$05$QpqAScJ9I/oIrNqYz3IVJ.AU6.5VXC2.6UffLqJ11k3u0Z0R8OMw2');

INSERT INTO public.users_roles(
	"userId", "roleId")
	VALUES (1, 1);


INSERT INTO public.color(
	id, color)
	VALUES
    (1,'#ffffff'),
    (2,'#008000'),
    (3,'#0000ff'),
    (4,'#000000'),
    (5,'#c0c0c0'),
    (6,'#ffff00');


INSERT INTO public.size(
	id, size)
	VALUES
    (1,'XS'),
    (2,'S'),
    (3,'M'),
    (4,'L'),
    (5,'XL');


INSERT INTO public.product(
	id, name, "descriptionHtml", price)
	VALUES
    (34,'Hat','The Next.js beanie has arrived! This embroidered beauty has a snug fit that ensures you''re going to feel cozy and warm whatever you''re doing.',80),
    (35,'Mask','This durable face mask is made from two layers of treated fabric and features elastic ear loops and a center flat seam that ensure a close fit. It''s machine-washable and reusable. Sold in packs of 3.',39),
    (36,'Short sleeve t-shirt','A super-soft, form-fitting, breathable t-shirt with a slightly lower neckline than a classic t-shirt.',25),
    (37,'Lightweight Jacket','Add a little zing to your winter wardrobe with this vibrant Winter-breaker Jacket. Black hardware.',250);


INSERT INTO public.image(
	id, url, "altText", "productId")
    VALUES
    (69,'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F115%2F489%2FHat-front-black__72990.1603748583.png&w=640&q=85','hat',34),
    (70,'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F115%2F494%2FHat-left-black__51142.1602591510.png&w=640&q=85','hat',34),
    (71,'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F115%2F490%2FHat-back-black__57260.1602591509.png&w=640&q=85','hat',34),
    (72,'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F118%2F508%2FSurgical-Mask-Black__89554.1603756821.png&w=640&q=85','mask',35),
    (73,'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F118%2F509%2FSurgical-Mask-Front-Black__75855.1603756822.png&w=640&q=85','mask',35),
    (74,'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F118%2F507%2FSurgical_Mask_black.G01__86690.1602592629.png&w=640&q=85','mask',35),
    (75,'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F119%2F398%2Fmockup-31b14bb5__19161.1603748166.png&w=640&q=85','sleeve',36),
    (76,'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F119%2F399%2Fmockup-c83ee0d3__79960.1601012457.png&w=640&q=85','sleeve',36),
    (77,'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F119%2F400%2Fmockup-7e303c9b__44172.1601012458.png&w=640&q=85','sleeve',36),
    (78,'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F116%2F512%2FMen-Jacket-Front-Black__15466.1603283963.png&w=640&q=85','jacket',37),
    (79,'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F116%2F510%2FMen-Jacket-Side-Black__68202.1603283961.png&w=640&q=85','jacket',37),
    (80,'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F116%2F513%2FMen-Jacket-Back-Black__33864.1603283963.png&w=640&q=85','jacket',37);


INSERT INTO public.product_options(
	id, "productId", quantity, "sizeId", "colorId")
	VALUES
    (528,34,10,2,6),
    (529,35,6,2,4),
    (530,35,3,3,1),
    (531,36,5,2,5),
    (532,36,5,3,6),
    (533,36,4,5,2),
    (534,37,3,3,4),
    (535,37,4,4,5);
