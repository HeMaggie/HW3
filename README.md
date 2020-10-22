# HW3

## Mengmei He
## PSID: 1850021

### 1. Operaing System:
MacOS 10.15

### 2. IDE:
Xcode

### 3. Details:
-Vertex Shader: <br>
(1)Input <br>
Get coordinate_of_vertex form location 0. <br>
Get attribute_pointer of vertex from location 1. <br>
Get model matrix, view matrix, and projection matrix through uniform. <br>

(2)It defines the "gl_Position", which is the position of the current vertex.<br> 
gl_Position = projection * view * model * coordinate_of_vertex.<br>

(3)Output
"Normal direction" of the vertex & "fragment position".<br>
Normal = inverse(transpose(mat3(model))) * aNormal, where aNormal is the vertex attribute pointers defined in the vertices array.<br>
Fragment Position(FragPos) = model matrix * coordinate_of_vertex.<br>

-Fragment Shader:
(1)Input
"Normal" & "Fragment Position(FragPos)" from vertex shader,
"light Position"(lightPos), "View Position"(viewPos), "light color"(lightColor), & "object color"(objectColor) through uniform.

(2)Phong Model
a. Ambient Light: 
ambient = ambientStrength * lightColor, where ambientStrength I set to 0,2.
b. Diffuse Reflection: 
Color of diffused light is the component that the light has on the normal vector direction. 
--> diffuse = max(dot(lightDir,norm), 0.0) * lightColor, 
where lightDir(light direction) is normalize(lightPos - FragPos),
and norm is normalize(Normal);
c. Specular Highlight:
Specular highlight is to do with the view direction and the direction of the reflected light. It is the component that the reflected light has on the view direction. 
--> specular = specularStrength * pow(max(dot(viewDir, reflectDir),0.0),128) * lightColor, where
specularStrength = 0.3,
viewDir = normalize(viewPos - FragPos),
reflectDir = reflect(-lightDir, norm),
power is added to improve the effect that the change of vectorial angle b/t viewDir and reflectDir has on the change of specular light strength.

(3)Output
FragColor = (ambient + diffuse + specular) * objectColor.

-Main.cpp
Passing the parameters the shader files needed through uniform.
(1)model: set as identity matrix
        glm::mat4 M1 = glm::mat4
        (glm::vec4(1.0,0.0,0.0,0.0),
         glm::vec4(0.0,1.0,0.0,0.0),
         glm::vec4(0.0,0.0,1.0,0.0),
         glm::vec4(0.0,0.0,0.0,1.0));

(2)view: call camera.GetViewMatrix();

(3)projection matrix: using glm::perspective(fovy,aspect,near,far)
glm::perspective(100.0f, 1.5f, 3.0f, 150.0f);
 
(4)light position = (0.0f,0.0f,-2.0f);
        
(5)view position= (0.2f,0.2f,-1.0f);

(6)Color of light = (1.0f,1.0f,1.0f);
        
(7)Color of the cube = (0.6f,0.9f,0.8f);

Camera:
GetViewMatrix returns:
glm::lookAt
        (glm::vec3(2.0, 0.0, -5.0),
         glm::vec3(0.0, 0.0, 0.0),
         glm::vec3(0.0, 1.0, 0.0));
