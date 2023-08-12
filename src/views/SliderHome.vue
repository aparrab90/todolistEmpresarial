<template>
    <div >
        <b-carousel id="my-carousel" :interval="5000" controls>
            <b-carousel-slide img-src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.es%2Ffotos%2Fto-do-list&psig=AOvVaw3JwCitHEGvfdOJ0LdaFUcO&ust=1691878849108000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOiZ64DS1YADFQAAAAAdAAAAABAR"></b-carousel-slide>
            <b-carousel-slide img-src="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/To_Do_List.png?width=893&height=600&name=To_Do_List.png"></b-carousel-slide>
            <b-carousel-slide img-src="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/To_Do_List.png?width=893&height=600&name=To_Do_List.png"></b-carousel-slide>
        </b-carousel>
    </div>
</template>
  
<script>
import { BCarousel, BCarouselSlide } from 'bootstrap-vue';

export default {
    components: {
        BCarousel,
        BCarouselSlide,
    },
};
</script>
  