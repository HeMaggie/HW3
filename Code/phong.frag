#version 330 core
in vec3 Normal;
in vec3 FragPos;

uniform vec3 lightPos;
uniform vec3 viewPos;
uniform vec3 lightColor;
uniform vec3 objectColor;

out vec4 FragColor;

void main()
{
//    //ambient light
    float ambientStrength = 0.2;
    vec3 ambient = ambientStrength * lightColor;
    
    //diffuse Reflection
    float diffCoefficient = 0.9;
    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(lightPos - FragPos);
    float diff = max(dot(lightDir,norm),0.0);
    vec3 diffuse = diffCoefficient * diff * lightColor;

    //specular highlights
    float specularStrength = 0.3;
    vec3 viewDir = normalize(viewPos - FragPos);
    vec3 reflectDir = reflect(-lightDir, norm);
    float spec = pow(max(dot(viewDir, reflectDir),0.0),128);
    vec3 specular = specularStrength * spec * lightColor;

    //Phong Model
    vec3 phongModel = (ambient+diffuse+specular) * objectColor;
    FragColor = vec4(phongModel, 1.0);
}
