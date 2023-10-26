from django.db import models
from user_auth.models import Person
from django.db.models.signals import post_save
from django.dispatch import receiver


class Type(models.Model):
    type = models.CharField(max_length=150, help_text='Write here type of cuisine')

    def __str__(self) -> str:
        return f'{self.type}'
    
    class Meta:
        verbose_name = 'Type'
        verbose_name_plural = 'Types'


class Dish(models.Model):
    name = models.CharField(max_length=150, help_text='Write here name of the dish')
    photo = models.ImageField(upload_to='dishes/', null=True, blank=True)
    type = models.ForeignKey(Type, on_delete=models.SET_NULL, null=True, blank=True)
    price = models.PositiveIntegerField(default=0, help_text='Write here price of dish in som')
    made_of = models.TextField(help_text='Write here what is it made of', default='dk')

    def __str__(self) -> str:
        return f'{self.name}'
    
    class Meta:
        verbose_name = 'Dish'
        verbose_name_plural = 'Dishes'

class Drink(models.Model):

    CHOICES = [('alcohol', 'Alcohol'), ('hot', 'Hot'), ('cold', 'Cold')]

    name = models.CharField(max_length=150, help_text='Write here name of the drink')
    photo = models.ImageField(upload_to='drinks/', null=True, blank=True)
    price = models.PositiveIntegerField(default=0, help_text='Write here price of the drink in som')
    made_of = models.TextField(help_text='Write here what is it made of', null=True, blank=True)
    type = models.CharField(max_length=150, choices=CHOICES)

    def __str__(self) -> str:
        return f'{self.name}'
    
    class Meta:
        verbose_name = 'Drink'
        verbose_name_plural = 'Drinks'


class Restaurant(models.Model):
    name = models.CharField(max_length=150, help_text='Write here name of the restaurant')
    description = models.TextField(help_text='Write here description of the restaurant', null=True, blank=True)
    photo_1 = models.ImageField(upload_to='restaurants/', null=True, blank=True)
    photo_2 = models.ImageField(upload_to='restaurants/', null=True, blank=True)
    photo_3 = models.ImageField(upload_to='restaurants/', null=True, blank=True)
    type = models.ManyToManyField(Type)
    dishes = models.ManyToManyField(Dish)
    drinks = models.ManyToManyField(Drink)
    average_bill = models.IntegerField(default=0, help_text='Write here average bill of restaurant in som')
    tables = models.PositiveIntegerField(default=0, help_text='Write here amount of tables that can be reserved')
    address = models.CharField(max_length=150, null=True, blank=True)
    owner = models.ForeignKey(Person, on_delete=models.CASCADE)
    rating = models.IntegerField(default=0)

    # Возвращает количество свободных столов
    def get_available_tables(self):
        reserved_tables_count = self.table_set.filter(is_reserved=True).count()
        available_tables = self.table_set.count() - reserved_tables_count
        return available_tables
    
    # Нужен для обновления рейтинга
    def update_rating(self):
        positive_reviews = self.review_set.filter(positive_or_not='positive').count()
        negative_reviews = self.review_set.filter(positive_or_not='negative').count()
        self.rating = positive_reviews - negative_reviews
        self.save()

    def __str__(self):
        return f'{self.name}'
    
    class Meta:
        verbose_name = 'Restaurant'
        verbose_name_plural = 'Restaurants'
    

class Table(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    number = models.PositiveIntegerField()
    is_reserved = models.BooleanField(default=False)
    reserved_by = models.ForeignKey(Person, on_delete=models.SET_NULL, null=True, blank=True, default=None)
    reserved_time = models.DateTimeField(null=True, blank=True, help_text='Write here time when you will come')
    dishes = models.ManyToManyField(Dish)

    def __str__(self) -> str:
        return f'{self.number} in {self.restaurant} by {self.reserved_by}'
    
    class Meta:
        verbose_name = 'Table'
        verbose_name_plural = 'Tables'


class Review(models.Model):

    CHOICES = [('positive', 'Positive'), ('negative', 'Negative')]

    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, default='qwerty')
    content = models.TextField()
    person = models.ForeignKey(Person, on_delete=models.SET_DEFAULT, default=None)
    created_at = models.DateTimeField(auto_now_add=True)
    positive_or_not = models.CharField(max_length=100, choices=CHOICES, default='positive')

    def __str__(self) -> str:
        return f'{self.person} : {self.positive_or_not}'
    
    class Meta:
        verbose_name = 'Review'
        verbose_name_plural = 'Reviews'


# Создает Tables, которое указано в ресторане, дабы мы могли дальше их забронировать
@receiver(post_save, sender=Restaurant)
def create_tables(sender, instance, created, **kwargs):
    if created:
        num_tables = instance.tables  
        for table_number in range(1, num_tables + 1):
            Table.objects.create(restaurant=instance, number=table_number)

