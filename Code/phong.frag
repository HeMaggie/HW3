#version 330 core
//input from vertex shader
in vec3 Normal;
in vec3 FragPos;

//uniform
uniform vec3 lightPos;
uniform vec3 viewPos;
uniform vec3 lightColor;
uniform vec3 objectColor;

//output
out vec4 FragColor;

void main()
{
    //ambient light
    float ambientStrength = 0.2;
    vec3 ambient = ambientStrength * lightColor;
    
    //diffuse Reflection
    vec3 norm = normalize(Normal);        //turn Normal to identity vector
    vec3 lightDir = normalize(lightPos - FragPos);  //turn light direction to identity
    float diff = max(dot(lightDir,norm),0.0);   //get the diffused reflected light, which is the component the light has on the normal vector direction
    vec3 diffuse = diff * lightColor;  //the diffused color of light on the fragment
    
    //specular highlights
    float specularStrength = 0.3;
    vec3 viewDir = normalize(viewPos - FragPos);    //view direction at each fragment
    vec3 reflectDir = reflect(-lightDir, norm);     //reflected light
    float spec = pow(max(dot(viewDir, reflectDir),0.0),128);   //specular light, which is the component that the reflected light has on the view direction.
    vec3 specular = specularStrength * spec * lightColor;   //result of the color of the specular light

    //Phong Model = ambient + diffuse + specular
    vec3 result = (ambient + diffuse + specular) * objectColor;  //the result color of the object
    FragColor = vec4(result, 1.0);
}
