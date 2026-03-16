from rest_framework import serializers
from django.contrib.auth.models import User
from.models import Usuario, Imovel, Contrato, Pagamento

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    nome = serializers.CharField(required=False, allow_blank=True, default='')
    telefone = serializers.CharField(required=False, allow_blank=True, default='')
    tipo = serializers.ChoiceField(choices=Usuario.TIPO_CHOICES)

    def create(self, validated_data):
        nome = validated_data.get('nome', '')
        telefone = validated_data.get('telefone', '')
        tipo = validated_data['tipo']
        email = validated_data['email']

        user = User.objects.create_user(
            username=validated_data['username'],
            email=email,
            password=validated_data['password']
        )

       

        if tipo == 'LOCADOR':
            user.is_staff = True
        else:
            user.is_staff = False
        user.is_active = True
        user.is_superuser = False
        user.save()

        #Criando Usuário na Tabela Usuario
        Usuario.objects.create(
            user=user,
            nome=nome if nome else user.username,
            email=email,
            telefone=telefone,
            tipo=tipo
        )

        return user


class ImovelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Imovel
        fields = '__all__'

class ContratoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contrato
        fields = '__all__'

class PagamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pagamento
        fields = '__all__'