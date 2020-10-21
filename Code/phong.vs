#version 330 core
layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 aNormal;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

out vec3 FragPos;
out vec3 Normal;

void main()
{
    Normal = inverse(transpose(mat3(model))) * aNormal;    //normal of vertex
    FragPos = vec3(model * vec4(aPos,1.0));                //fragment position
    gl_Position = projection * view * vec4(FragPos, 1.0);  //position of current vertex
}
