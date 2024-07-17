set search_path=firmas;
alter table personal add column idecba text;
alter table modelos_firma add column con_idecba boolean default true;