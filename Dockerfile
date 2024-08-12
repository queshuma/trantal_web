# 使用官方nginx作为父镜像  
FROM nginx:alpine  
 
# 将dist目录下的内容复制到nginx的/usr/share/nginx/html/目录  
COPY ./dist /usr/share/nginx/html  
 
# 如果需要，复制nginx配置文件  
# COPY nginx.conf /etc/nginx/nginx.conf  
 
# 暴露端口  
EXPOSE 80  
 
# 设置容器启动时执行nginx  
CMD ["nginx", "-g", "daemon off;"]
