--==================�����û���
create table user_table
(
    u_id  number primary key,
    u_email varchar2(50) not null,
    u_passw varchar2(50) not null
)

-- ������������
create sequence user_table_seq
minvalue 1
maxvalue 999999
start with 1
increment by 1
cache 20;

--������������
create or replace trigger user_table_tig
before insert on user_table for each row 
begin
    select to_char(user_table_seq.nextval) into:new.u_id from dual;
end user_table_tig;
/
--�鿴��ṹ
desc userTable;
--�鿴��
select * from user_table;
--�����û�������
insert into user_table(u_email,u_passw) values('admin@qq.com', '123123');
insert into user_table(u_email,u_passw) values('123@qq.com', '123');
--=============================

--====================��������
create table book_class
(
    c_id  number primary key,
    c_name varchar2(50) not null
)
-- ������������
create sequence book_class_seq
minvalue 1
maxvalue 999999
start with 1
increment by 1
cache 20;

--������������
create or replace trigger book_class_tig
before insert on book_class for each row 
begin
    select to_char(book_class_seq.nextval) into:new.c_id from dual;
end book_class_tig;
/
--�鿴����
select * from book_class;
--��������
insert into book_class(c_name) values('��ѧ');
insert into book_class(c_name) values('�Ƽ�');
insert into book_class(c_name) values('ʷ��');
insert into book_class(c_name) values('����');
--============================

--==================����������
--�鱾�� ID Int �� 
--�鱾 ID Title Varchar  
--�鱾���� Class Varchar �� ��� 
--Img Varchar  ͼƬ 
--Author Varchar  �������� 
--Detail Varchar  ��ϸ���� 
--Time Date 
--ɾ����
drop table book purge;
--������
create table book
(
    b_id  number primary key,
    b_title varchar2(50) not null,
    b_class number not null,
    b_img VARCHAR2(250) not null,
    b_author VARCHAR2(50) not null,
    b_detail VARCHAR2(2500) not null,
    b_time TIMESTAMP(9) default sysdate
)
--�������
alter table book add constraint book_class foreign key(b_class) references book_class(c_id) on delete cascade;

-- ������������
create sequence book_seq
minvalue 1
maxvalue 999999
start with 1
increment by 1
cache 20;

--ɾ������
DROP SEQUENCE book_seq;
--������������
create or replace trigger book_tig
before insert on book for each row 
begin
    select to_char(book_seq.nextval) into:new.b_id from dual;
end book_tig;
/


--��������
insert into book(b_title,b_class,b_img,b_author,b_detail) 
    values(
    '���壨ȫ����',
    1,
    'https://wfqqreader-1252317822.image.myqcloud.com/cover/233/695233/t6_695233.jpg',
    '������',
    'ÿ���˵�����϶������ס����塷�������������Ұ�����󣡾�����������������й��ƻ������������������綥���ƻô󽱣�����16�����֣���ɨ30�����ߣ��°����׾������ڡ��ܺ�Є����ʯ�١����˲��񡭡�ǿ�ƣ����������2018��ȿ�����������������ά�����������й��ƻ�С˵������Ҫ�������ң�������λ����ƻô󽱡������������������Ϊ�й��ƻõ�������'
    );
insert into book(b_title,b_class,b_img,b_author,b_detail) 
    values(
    '��¥��',
    2,
    'https://wfqqreader-1252317822.image.myqcloud.com/cover/606/316606/t6_316606.jpg',
    '��ѩ��',
    'ǧ��һ�ޣ�����ͬ�� ����¥�Ρ�������ʯͷ�ǡ������й��ŵ�С˵���۷�֮����λ�ӡ��й��ŵ��Ĵ�������֮�ס�һ����Ϊȫ��ǰ��ʮ�������С˵�Ҳ�ѩ������������ʮ���ɸ������ɡ��ⲿ�й���ѧʷ�ϵĺ�ƪ���ƣ�����ḻ��˼�����ݡ�ΰ��������ɾͺ���Զ���Ļ�Ӱ���Ϊ�й��ŵ���ѧʷ�ϵ�һ�����⡣'
    );
insert into book(b_title,b_class,b_img,b_author,b_detail) 
    values(
    '�ٻ�',
    2,
    'https://wfqqreader-1252317822.image.myqcloud.com/cover/214/31681214/t6_31681214.jpg',
    'ˮ����',
    '����ҵ�ʱ�����������Ѧ���ƣ�����������µ����ᣬҲ��������̹ǵ���ʹ������һ�δεľ����б�ü�ǿ��ȴ�ҿ����������ܲ�������ࡣ���������������ף����������еĴȱ�������ı�Ѿã����Ǿñ��طꡣ'
    );
insert into book(b_title,b_class,b_img,b_author,b_detail) 
    values(
    '������˥��ʮ�꣨ȫ����',
    2,
    'https://wfqqreader-1252317822.image.myqcloud.com/cover/609/35224609/t6_35224609.jpg',
    '����',
    '���й��Ŵ���ʷ�ϣ�����һ�����س�һ��������ͳһ���������峯���ڲ�����ʮ���������������ܶ���������ȴҲ�ʹ���һ����ӵ�зǷ����������ʷ���ԣ�ͳһ����ǿ���������������Ű���췴���档����һ����ǿ�����������������Ĳֿ����������ʮ��Բ������ʳ�����Ļʵ۱�ͻ������Ϊ��ʥ�˿ɺ�����������һ����������Ű�����������Ļʵ��޳��ǡ������������˺ӡ��ν��ϣ���ù������ա�������ʱ�����塱������־�������һ�������й���ʷ��˲������˲������峯�������Ӿ�������ʲô��������������������ԭ���������'
    );
    
insert into book(b_title,b_class,b_img,b_author,b_detail) 
    values(
    '������Щ�¶���ȫ����',
    2,
    'https://wfqqreader-1252317822.image.myqcloud.com/cover/995/822995/t6_822995.jpg',
    '��������',
    '��������Щ�¶�����Ҫ�������Ǵ�1344�굽1644��������������������һЩ���¡���ʷ��Ϊ������������;�������Ϊ���ߣ���������С˵�ıʷ���������Ĭ��Ȥ��������ʮ�ߵۺ���������Ȩ���С��������˽���ȫ��չʾ������Թٳ����Ρ�ս��������������ī��࣬������Ե�ʱ���ξ����ƶȡ����׵��µ����塣����һ����������������渵����������ٶ������ʷ���¡��������ԭ������ʷ��İ����ģ������ʷ����������һ��������ʻ���������������Щ�¶���Ϊ���ǽ����ʷ�е���һ�棬����ʷ���һ����������������¡�'
    );
insert into book(b_title,b_class,b_img,b_author,b_detail) 
    values(
    '�����ʷ���Ӷ��ﵽ�ϵ�',
    3,
    'https://wfqqreader-1252317822.image.myqcloud.com/cover/812/855812/t6_855812.jpg',
    '���߶���������',
    'ʮ����ǰ�����������ˣ�Ϊʲôֻʣ���� �������ʷ�Ӷ��ﵽ�ϵۡ�����ɫ��������ʷѧ�ҵ�һ���ذ���Ʒ����ʮ����ǰ����������ʼ��21�����ʱ����Ƽ���֯�����෢չʷ��ʮ����ǰ���������������������֣�Ϊ�ν���ȴֻʣ���������Լ�����������ֻ�Ƿ��޽���һ���������۵���Ⱥ���Ե�������̬��Ӱ������ө��桢���ɻ���ˮĸ����޼���Ϊ�������ܵ����������Ķ��ˣ����ճ�Ϊ��������ף�����֪������ũҵ��������ѧ��������������˽��Լ������ǹ��ø��ӿ���������֪����Ǯ���ڽ̴Ӻζ�����Ϊ�β��������ഴ���ĵ۹�Ϊ��һ����˥��������Ϊʲô�����ϼ���ÿһ����ᶼ������Ů���Ĺ��Ϊ��һ��̳�ΪΪ�㷺���ܵ��ڽ̣���ѧ���ʱ�������γ�Ϊ�ִ������Ҫ������������Ӱ�����෢չ���ش����磬�ھ������Ļ����ڽ̡����ɡ����ҡ��Ŵ��Ȳ����ĸ�Դ������һ�����������ʷ������΢֪������Сд�����������������Լ���'
    );
insert into book(b_title,b_class,b_img,b_author,b_detail) 
    values(
    '���»ᣨ2020��12���£�',
    4,
    'https://wfqqreader-1252317822.image.myqcloud.com/cover/489/35241489/t6_35241489.jpg',
    '���»�༭��',
    '�����»ᡷ���й���ͨ�׵������ѧС����־�����й������ƿ���֮һ���Ⱥ��������й��ڿ�����߽����������ڿ�����1998�꣬���������ۺ����ڿ��з�����������5����1984�꿪ʼ�������»ᡷ��˫�¿���Ϊ�¿���2003��11�·ݿ�ʼ���а��¿���2004����ʽ��Ϊ���¿����ַ�Ϊ�졢�����棬���к��Ϊ�ϰ��¿����̰�Ϊ�°��¿���'
    );
insert into book(b_title,b_class,b_img,b_author,b_detail) 
    values(
    '�Ҹ��ȫ������ֵ�׽�棩',
    2,
    'https://wfqqreader-1252317822.image.myqcloud.com/cover/631/842631/t6_842631.jpg',
    '����Ȼ',
    '������¼�˰ͷ��ء���˷��ա�Ħ���Լ���˹�طƶ��µ���λ������������˸���Ů��һ���Ҹ棬��Щ�Ҹ���ޱ������ܽ��Ũ�������ǻԻ�һ���ľ�����ǻۡ�'
    );
--�鿴��
select b_id,b_title,(select c_name from book_class where c_id = book.b_class) as b_class,b_img,b_author,b_detail from book;
--=========================

--======================�������۱�
--ID Int �� ����ID 
--Content Varchar  ����
--Time sysDate  ����ʱ�� 
create table book_msg
(
    m_id  number primary key,
    m_content varchar2(250) not null,
    m_time TIMESTAMP(9) default sysdate
)
-- ������������
create sequence book_msg_seq
minvalue 1
maxvalue 999999
start with 1
increment by 1
cache 20;

--ɾ������
DROP SEQUENCE book_msg_seq;
--������������
create or replace trigger book_msg_tig
before insert on book_msg for each row 
begin
    select to_char(book_msg_seq.nextval) into:new.m_id from dual;
end book_msg_tig;
/
--===========================


--==============���۹�ϵ��
--Book_id Int �� �鱾 ID 
--Msg_id Int  ���� ID 
--User_id Int �� �û� ID 
create table book_msg_relate
(
    r_bookid  number not null,
    r_msgid number not null,
    r_userid number not null
)
--������
alter table book_msg_relate add constraint book_msg_relate_bookid foreign key(r_bookid) references book(b_id) on delete cascade;
alter table book_msg_relate add constraint book_msg_relate_msgid foreign key(r_msgid) references book_msg(m_id) on delete cascade;
alter table book_msg_relate add constraint book_msg_relate_userid foreign key(r_userid) references user_table(u_id) on delete cascade;
--=======================

--======================�����
--ID Int �� ��� ID 
--Book_id Int �� �鱾 ID 
--User_id Int �� �û� ID 
--time Date  ����ʱ�� 
drop table book_look purge;

create table book_look
(
    l_id number primary key,
    l_bookid number not null,
    l_userid number not null,
    l_time TIMESTAMP(9) default sysdate
)
--������
alter table book_look add constraint book_look_bookid foreign key(l_bookid) references book(b_id) on delete cascade;
alter table book_look add constraint book_look_userid foreign key(l_userid) references user_table(u_id) on delete cascade;
--========================