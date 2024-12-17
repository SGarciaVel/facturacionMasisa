--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Debian 14.13-1.pgdg110+1)
-- Dumped by pg_dump version 16.4 (Debian 16.4-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: sgarcia
--

CREATE TABLE public.users (
    id integer NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(100) NOT NULL,
    verification_code character varying(10),
    is_verified boolean DEFAULT false,
    nombre character varying(50),
    apellido character varying(50),
    pais character varying(50),
    fecha_nacimiento date,
    verification_code_expiration timestamp with time zone
);


ALTER TABLE public.users OWNER TO sgarcia;

--
-- Name: TABLE users; Type: COMMENT; Schema: public; Owner: sgarcia
--

COMMENT ON TABLE public.users IS 'Tabla de usuarios';


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: sgarcia
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO sgarcia;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sgarcia
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: sgarcia
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: sgarcia
--

COPY public.users (id, password, email, verification_code, is_verified, nombre, apellido, pais, fecha_nacimiento, verification_code_expiration) FROM stdin;
2			\N	f	\N	\N	\N	\N	\N
24	$2a$10$1wpGxmMyRPAAqcZK7ku8rObYWRnLqR017eLJ4O.KoBN3giCE5zn8q	sebastian.rgarciavelasquez@gmail.com	4JRCLL	t	Sebastian	Garcia	Chile	1997-11-11	2024-12-17 01:35:05.419-03
25	$2a$10$7esXUrzzybhGZR8vQYqVneDcbEt4NYCcfZcU83aiJ7kI55j3LN6HS	sebastian.garcia1601@alumnos.ubiobio.cl	39EYCX	t	hola	comoestas	Chile	1997-11-11	2024-12-17 03:01:58.809-03
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sgarcia
--

SELECT pg_catalog.setval('public.users_id_seq', 25, true);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: sgarcia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: sgarcia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: idx_users_email; Type: INDEX; Schema: public; Owner: sgarcia
--

CREATE INDEX idx_users_email ON public.users USING btree (email);


--
-- PostgreSQL database dump complete
--