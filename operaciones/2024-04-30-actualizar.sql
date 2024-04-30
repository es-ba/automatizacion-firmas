set search_path=firmas;
alter table personal add column prefijo_telefono text;
alter table personal add column prefijo_espacio text;
update personal set prefijo_espacio='Of.' where espacio is not null;
update personal set prefijo_telefono='Tel.:' where telefono is not null;