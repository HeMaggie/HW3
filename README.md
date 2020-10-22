# HW3

## Mengmei He
## PSID: 1850021

### 1. Operaing System:
MacOS 10.15

### 2. IDE:
Xcode

### 3. Details:
1. Vertex Shader: <br>

(1) Input <br>
Get coordinate_of_vertex form location 0. <br>
Get attribute_pointer of vertex from location 1. <br>
Get model matrix, view matrix, and projection matrix through uniform. <br>

(2) It defines the "gl_Position", which is the position of the current vertex.<br> 
gl_Position = projection * view * model * coordinate_of_vertex.<br>

(3) Output<br>
"Normal direction" of the vertex & "fragment position".<br>
Normal = inverse(transpose(mat3(model))) * aNormal, where aNormal is the vertex attribute pointers defined in the vertices array.<br>
Fragment Position(FragPos) = model matrix * coordinate_of_vertex.<br>

---------------------------
2. Fragment Shader:<br>

(1) Input<br>
"Normal" & "Fragment Position(FragPos)" from vertex shader,<br>
"light Position"(lightPos), "View Position"(viewPos), "light color"(lightColor), & "object color"(objectColor) through uniform.<br>

(2) Phong Model<br>
a. Ambient Light: <br>
ambient = ambientStrength * lightColor, where ambientStrength I set to 0,2.<br>

b. Diffuse Reflection: <br>
Color of diffused light is the component that the light has on the normal vector direction. <br>
--> diffuse = max(dot(lightDir,norm), 0.0) * lightColor, <br>
where lightDir(light direction) is normalize(lightPos - FragPos),<br>
and norm is normalize(Normal);<br>

c. Specular Highlight:<br>
Specular highlight is to do with the view direction and the direction of the reflected light. It is the component that the reflected light has on the view direction. <br>
--> specular = specularStrength * pow(max(dot(viewDir, reflectDir),0.0),128) * lightColor, where<br>
specularStrength = 0.3,<br>
viewDir = normalize(viewPos - FragPos),<br>
reflectDir = reflect(-lightDir, norm),<br>
power is added to improve the effect that the change of vectorial angle b/t viewDir and reflectDir has on the change of specular light strength.<br>

(3)Output<br>
FragColor = (ambient + diffuse + specular) * objectColor.<br>

------------------------
3. Main.cpp<br>
Passing the parameters the shader files needed through uniform. Do this in the while loop ahead of lightingShader.Use();<br>
(1) model: set as identity matrix<br>
        glm::mat4 M1 = glm::mat4<br>
        (glm::vec4(1.0,0.0,0.0,0.0),<br>
         glm::vec4(0.0,1.0,0.0,0.0),<br>
         glm::vec4(0.0,0.0,1.0,0.0),<br>
         glm::vec4(0.0,0.0,0.0,1.0));<br>

(2) view: call camera.GetViewMatrix();<br>

(3) projection matrix: using glm::perspective(fovy,aspect,near,far)<br>
glm::perspective(100.0f, 1.5f, 3.0f, 150.0f);<br>
 
(4) light position = (lightPos.x, lightPos.y, lightPos.z)= (1.2f, 1.0f, 2.0f);
        
(5) view position= (camera.Position.x,camera.Position.y,camera.Position.z) = (0.0f, 0.0f, 3.0f);

(6) Color of light = (1.0f,1.0f,1.0f);
        
(7) Color of the cube = (0.6f,0.9f,0.8f);

---------------------
4. Camera:<br>
GetViewMatrix returns:<br>
glm::mat4 view = glm::lookAt<br>
(glm::vec3(x, 0.0, z), <br>
glm::vec3(0.0, 0.0, 0.0), <br>
glm::vec3(0.0, 1.0, 0.0));  <br> 
where x = sin(glfwGetTime()) * radius, z = cos(glfwGetTime()) * radius.<br>

Use the time to change the x and z coordinate to make the cube rotate automatically.<br>

### 4. IMAGES

1. Ambient

![Image of Ambient](image/1.Ambient.png)

2. Diffuse

![Image of Diffuse](image/2.Diffuse.png)

3. Specular

![Image of Specular](image/3.Specular.png)

4.Phong Model

![Image of Phong](image/4.Phong.png)




