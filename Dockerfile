# 指定基础镜像
FROM nginx

 #将本地dist文件夹中的内容复制到容器的/usr/share/nginx/html/目录下
COPY ./dist/ /usr/share/nginx/html/

 # 暴露容器端口 
EXPOSE 80

 # 容器启动时自动运行nginx服务 
CMD ["nginx", "-g", "daemon off;"]