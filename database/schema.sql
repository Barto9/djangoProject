PGDMP                      }           Gded    17.1    17.1 %               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false                       1262    40994    Gded    DATABASE     y   CREATE DATABASE "Gded" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Polish_Poland.1250';
    DROP DATABASE "Gded";
                     postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                     pg_database_owner    false                        0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                        pg_database_owner    false    4            �            1259    41062 	   note_tags    TABLE     ]   CREATE TABLE public.note_tags (
    note_id integer NOT NULL,
    tag_id integer NOT NULL
);
    DROP TABLE public.note_tags;
       public         heap r       postgres    false    4            �            1259    41010    note_templates    TABLE       CREATE TABLE public.note_templates (
    id integer NOT NULL,
    user_id integer,
    name text NOT NULL,
    description text,
    template_content text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);
 "   DROP TABLE public.note_templates;
       public         heap r       postgres    false    4            �            1259    41009    note_templates_id_seq    SEQUENCE     �   CREATE SEQUENCE public.note_templates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.note_templates_id_seq;
       public               postgres    false    4    220            !           0    0    note_templates_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.note_templates_id_seq OWNED BY public.note_templates.id;
          public               postgres    false    219            �            1259    41026    notes    TABLE     �   CREATE TABLE public.notes (
    id integer NOT NULL,
    user_id integer,
    template_id integer,
    title text,
    content text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);
    DROP TABLE public.notes;
       public         heap r       postgres    false    4            �            1259    41025    notes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.notes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.notes_id_seq;
       public               postgres    false    4    222            "           0    0    notes_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.notes_id_seq OWNED BY public.notes.id;
          public               postgres    false    221            �            1259    41047    tags    TABLE     c   CREATE TABLE public.tags (
    id integer NOT NULL,
    user_id integer,
    name text NOT NULL
);
    DROP TABLE public.tags;
       public         heap r       postgres    false    4            �            1259    41046    tags_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.tags_id_seq;
       public               postgres    false    4    224            #           0    0    tags_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;
          public               postgres    false    223            �            1259    40996    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    pass text NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);
    DROP TABLE public.users;
       public         heap r       postgres    false    4            �            1259    40995    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               postgres    false    4    218            $           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public               postgres    false    217            l           2604    41013    note_templates id    DEFAULT     v   ALTER TABLE ONLY public.note_templates ALTER COLUMN id SET DEFAULT nextval('public.note_templates_id_seq'::regclass);
 @   ALTER TABLE public.note_templates ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    220    219    220            o           2604    41029    notes id    DEFAULT     d   ALTER TABLE ONLY public.notes ALTER COLUMN id SET DEFAULT nextval('public.notes_id_seq'::regclass);
 7   ALTER TABLE public.notes ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    221    222    222            r           2604    41050    tags id    DEFAULT     b   ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);
 6   ALTER TABLE public.tags ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    224    223    224            j           2604    40999    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218            �           2606    41066    note_tags note_tags_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.note_tags
    ADD CONSTRAINT note_tags_pkey PRIMARY KEY (note_id, tag_id);
 B   ALTER TABLE ONLY public.note_tags DROP CONSTRAINT note_tags_pkey;
       public                 postgres    false    225    225            z           2606    41019 "   note_templates note_templates_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.note_templates
    ADD CONSTRAINT note_templates_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.note_templates DROP CONSTRAINT note_templates_pkey;
       public                 postgres    false    220            |           2606    41035    notes notes_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.notes DROP CONSTRAINT notes_pkey;
       public                 postgres    false    222            ~           2606    41056    tags tags_name_key 
   CONSTRAINT     M   ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_name_key UNIQUE (name);
 <   ALTER TABLE ONLY public.tags DROP CONSTRAINT tags_name_key;
       public                 postgres    false    224            �           2606    41054    tags tags_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.tags DROP CONSTRAINT tags_pkey;
       public                 postgres    false    224            t           2606    41008    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public                 postgres    false    218            v           2606    41004    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    218            x           2606    41006    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public                 postgres    false    218            �           2606    41067     note_tags note_tags_note_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.note_tags
    ADD CONSTRAINT note_tags_note_id_fkey FOREIGN KEY (note_id) REFERENCES public.notes(id) ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.note_tags DROP CONSTRAINT note_tags_note_id_fkey;
       public               postgres    false    225    222    4732            �           2606    41072    note_tags note_tags_tag_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.note_tags
    ADD CONSTRAINT note_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.note_tags DROP CONSTRAINT note_tags_tag_id_fkey;
       public               postgres    false    4736    224    225            �           2606    41020 *   note_templates note_templates_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.note_templates
    ADD CONSTRAINT note_templates_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.note_templates DROP CONSTRAINT note_templates_user_id_fkey;
       public               postgres    false    218    220    4726            �           2606    41041    notes notes_template_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.note_templates(id) ON DELETE SET NULL;
 F   ALTER TABLE ONLY public.notes DROP CONSTRAINT notes_template_id_fkey;
       public               postgres    false    220    222    4730            �           2606    41036    notes notes_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.notes DROP CONSTRAINT notes_user_id_fkey;
       public               postgres    false    218    4726    222            �           2606    41057    tags tags_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 @   ALTER TABLE ONLY public.tags DROP CONSTRAINT tags_user_id_fkey;
       public               postgres    false    218    4726    224           