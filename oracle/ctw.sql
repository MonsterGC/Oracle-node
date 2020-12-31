--==================创建用户表
create table user_table
(
    u_id  number primary key,
    u_email varchar2(50) not null,
    u_passw varchar2(50) not null
)

-- 创建自增序列
create sequence user_table_seq
minvalue 1
maxvalue 999999
start with 1
increment by 1
cache 20;

--创建触发器：
create or replace trigger user_table_tig
before insert on user_table for each row 
begin
    select to_char(user_table_seq.nextval) into:new.u_id from dual;
end user_table_tig;
/
--查看表结构
desc userTable;
--查看表
select * from user_table;
--插入用户表数据
insert into user_table(u_email,u_passw) values('admin@qq.com', '123123');
insert into user_table(u_email,u_passw) values('123@qq.com', '123');
--=============================

--====================创建类别表
create table book_class
(
    c_id  number primary key,
    c_name varchar2(50) not null
)
-- 创建自增序列
create sequence book_class_seq
minvalue 1
maxvalue 999999
start with 1
increment by 1
cache 20;

--创建触发器：
create or replace trigger book_class_tig
before insert on book_class for each row 
begin
    select to_char(book_class_seq.nextval) into:new.c_id from dual;
end book_class_tig;
/
--查看数据
select * from book_class;
--插入数据
insert into book_class(c_name) values('文学');
insert into book_class(c_name) values('科技');
insert into book_class(c_name) values('史纪');
insert into book_class(c_name) values('故事');
--============================

--==================创建书名表
--书本表： ID Int 主 
--书本 ID Title Varchar  
--书本名字 Class Varchar 外 类别 
--Img Varchar  图片 
--Author Varchar  作者名称 
--Detail Varchar  详细描述 
--Time Date 
--删除表
drop table book purge;
--创建表
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
--建立外键
alter table book add constraint book_class foreign key(b_class) references book_class(c_id) on delete cascade;

-- 创建自增序列
create sequence book_seq
minvalue 1
maxvalue 999999
start with 1
increment by 1
cache 20;

--删除序列
DROP SEQUENCE book_seq;
--创建触发器：
create or replace trigger book_tig
before insert on book for each row 
begin
    select to_char(book_seq.nextval) into:new.b_id from dual;
end book_tig;
/


--插入数据
insert into book(b_title,b_class,b_img,b_author,b_detail) 
    values(
    '三体（全集）',
    1,
    'https://wfqqreader-1252317822.image.myqcloud.com/cover/233/695233/t6_695233.jpg',
    '刘慈欣',
    '每个人的书架上都该有套《三体》！关于宇宙最狂野的想象！就是它！征服世界的中国科幻神作！包揽九项世界顶级科幻大奖！出版16个语种，横扫30国读者！奥巴马、雷军、马化腾、周鸿袆、潘石屹、扎克伯格……强推！刘慈欣获得2018年度克拉克想象力贡献社会奖！刘慈欣是中国科幻小说的最主要代表作家，亚洲首位世界科幻大奖“雨果奖”得主，被誉为中国科幻的领军人物。'
    );
insert into book(b_title,b_class,b_img,b_author,b_detail) 
    values(
    '红楼梦',
    2,
    'https://wfqqreader-1252317822.image.myqcloud.com/cover/606/316606/t6_316606.jpg',
    '曹雪芹',
    '千红一哭，万艳同悲 《红楼梦》又名《石头记》，是中国古典小说的巅峰之作，位居“中国古典四大名著”之首。一般认为全书前八十回由清代小说家曹雪芹所作，后四十回由高鹗续成。这部中国文学史上的鸿篇巨制，以其丰富的思想内容、伟大的艺术成就和深远的文化影响成为中国古典文学史上的一朵奇葩。'
    );
insert into book(b_title,b_class,b_img,b_author,b_detail) 
    values(
    '再婚',
    2,
    'https://wfqqreader-1252317822.image.myqcloud.com/cover/214/31681214/t6_31681214.jpg',
    '水烟萝',
    '在最悲惨的时候，沈瑜遇到了薛度云，他给了她最极致的温柔，也带给她最刻骨的疼痛。她在一次次的经历中变得坚强，却揭开了令她承受不起的真相。后来，她终于明白，他对她所有的慈悲不是蓄谋已久，而是久别重逢。'
    );
insert into book(b_title,b_class,b_img,b_author,b_detail) 
    values(
    '大隋兴衰四十年（全集）',
    2,
    'https://wfqqreader-1252317822.image.myqcloud.com/cover/609/35224609/t6_35224609.jpg',
    '蒙曼',
    '在中国古代历史上，存在一个和秦朝一样短命的统一王朝——隋朝，在不到四十年间二世而亡。尽管短命，大隋却也和大秦一样，拥有非凡、传奇的历史特性：统一、富强、文明与短命、暴虐、造反并存。这是一个富强、文明的王朝，它的仓库里堆着五六十年吃不完的粮食，它的皇帝被突厥人誉为“圣人可汗”；这又是一个短命、暴虐的王朝，它的皇帝修长城、建东都、开运河、游江南，搞得国无宁日、民无宁时。“隋”这个名字就像流星一样，在中国历史上瞬间璀璨又瞬间毁灭。隋朝两代父子究竟做了什么？大隋王朝勃兴速亡的原因又在哪里？'
    );
    
insert into book(b_title,b_class,b_img,b_author,b_detail) 
    values(
    '明朝那些事儿（全集）',
    2,
    'https://wfqqreader-1252317822.image.myqcloud.com/cover/995/822995/t6_822995.jpg',
    '当年明月',
    '《明朝那些事儿》主要讲述的是从1344年到1644年这三百年间关于明朝的一些故事。以史料为基础，以年代和具体人物为主线，并加入了小说的笔法，语言幽默风趣。对明朝十七帝和其他王公权贵和小人物的命运进行全景展示，尤其对官场政治、战争、帝王心术着墨最多，并加入对当时政治经济制度、人伦道德的演义。它以一种网络语言向读者娓娓道出明朝三百多年的历史故事、人物。其中原本在历史中陌生、模糊的历史人物在书中一个个变得鲜活起来。《明朝那些事儿》为我们解读历史中的另一面，让历史变成一部活生生的生活故事。'
    );
insert into book(b_title,b_class,b_img,b_author,b_detail) 
    values(
    '人类简史：从动物到上帝',
    3,
    'https://wfqqreader-1252317822.image.myqcloud.com/cover/812/855812/t6_855812.jpg',
    '尤瓦尔·赫拉利',
    '十万年前至少有六种人，为什么只剩我们 《人类简史从动物到上帝》是以色列新锐历史学家的一部重磅作品。从十万年前有生命迹象开始到21世纪资本、科技交织的人类发展史。十万年前，地球上至少有六个人种，为何今天却只剩下了我们自己？我们曾经只是非洲角落一个毫不起眼的族群，对地球上生态的影响力和萤火虫、猩猩或者水母相差无几。为何我们能登上生物链的顶端，最终成为地球的主宰？从认知革命、农业革命到科学革命，我们真的了解自己吗？我们过得更加快乐吗？我们知道金钱和宗教从何而来，为何产生吗？人类创建的帝国为何一个个衰亡又兴起？为什么地球上几乎每一个社会都有男尊女卑的观念？为何一神教成为为广泛接受的宗教？科学和资本主义如何成为现代社会重要的信条？理清影响人类发展的重大脉络，挖掘人类文化、宗教、法律、国家、信贷等产生的根源。这是一部宏大的人类简史，更见微知著、以小写大，让人类重新审视自己。'
    );
insert into book(b_title,b_class,b_img,b_author,b_detail) 
    values(
    '故事会（2020年12月下）',
    4,
    'https://wfqqreader-1252317822.image.myqcloud.com/cover/489/35241489/t6_35241489.jpg',
    '故事会编辑部',
    '《故事会》是中国最通俗的民间文学小本杂志，是中国的老牌刊物之一。先后获得两届中国期刊的最高奖——国家期刊奖。1998年，它在世界综合类期刊中发行量排名第5。从1984年开始，《故事会》由双月刊改为月刊，2003年11月份开始试行半月刊，2004年正式改为半月刊。现分为红、绿两版，其中红版为上半月刊，绿版为下半月刊。'
    );
insert into book(b_title,b_class,b_img,b_author,b_detail) 
    values(
    '忠告大全集（超值白金版）',
    2,
    'https://wfqqreader-1252317822.image.myqcloud.com/cover/631/842631/t6_842631.jpg',
    '范毅然',
    '本书收录了巴菲特、洛克菲勒、摩根以及查斯特菲尔德等四位享誉世界的名人给儿女的一生忠告，这些忠告毫无保留地总结和浓缩了他们辉煌一生的经验和智慧。'
    );
--查看表
select b_id,b_title,(select c_name from book_class where c_id = book.b_class) as b_class,b_img,b_author,b_detail from book;
--=========================

--======================创建评论表
--ID Int 主 评论ID 
--Content Varchar  内容
--Time sysDate  评论时间 
create table book_msg
(
    m_id  number primary key,
    m_content varchar2(250) not null,
    m_time TIMESTAMP(9) default sysdate
)
-- 创建自增序列
create sequence book_msg_seq
minvalue 1
maxvalue 999999
start with 1
increment by 1
cache 20;

--删除序列
DROP SEQUENCE book_msg_seq;
--创建触发器：
create or replace trigger book_msg_tig
before insert on book_msg for each row 
begin
    select to_char(book_msg_seq.nextval) into:new.m_id from dual;
end book_msg_tig;
/
--===========================


--==============评论关系表
--Book_id Int 外 书本 ID 
--Msg_id Int  评论 ID 
--User_id Int 外 用户 ID 
create table book_msg_relate
(
    r_bookid  number not null,
    r_msgid number not null,
    r_userid number not null
)
--添加外键
alter table book_msg_relate add constraint book_msg_relate_bookid foreign key(r_bookid) references book(b_id) on delete cascade;
alter table book_msg_relate add constraint book_msg_relate_msgid foreign key(r_msgid) references book_msg(m_id) on delete cascade;
alter table book_msg_relate add constraint book_msg_relate_userid foreign key(r_userid) references user_table(u_id) on delete cascade;
--=======================

--======================浏览表
--ID Int 主 浏览 ID 
--Book_id Int 外 书本 ID 
--User_id Int 外 用户 ID 
--time Date  访问时间 
drop table book_look purge;

create table book_look
(
    l_id number primary key,
    l_bookid number not null,
    l_userid number not null,
    l_time TIMESTAMP(9) default sysdate
)
--添加外键
alter table book_look add constraint book_look_bookid foreign key(l_bookid) references book(b_id) on delete cascade;
alter table book_look add constraint book_look_userid foreign key(l_userid) references user_table(u_id) on delete cascade;
--========================