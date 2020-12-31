--=================分页查询
select * from (select b.*,rownum num from book b) 
where num<=3 and num>0

--=================分页查看书列表
select * from (select b_id,b_title,(select c_name from book_class where c_id = b_class) as b_class,b_img,b_author,b_detail,rownum num from book) 
where num<=10 and num>5;

--
select * from book_class;

select * from (select b_id,b_title,(select c_name from book_class where c_id = b_class) as b_class,b_img,b_author,b_detail,rownum num from book) 
        where num<=10 and num>0;
        
select count(*) as num from book;

select count(*) from (select b.*,c.c_name as c_name from book b,book_class c where b.b_class = c.c_id) where c_name = '科技'