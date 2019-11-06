<template>
    <flipping-card v-model="flipped" mouseclick> 
        <template v-slot:front>
            <details-user-profile :user="user" @changepasswordclicked="flipped=true"/>
        </template>
        <template v-slot:back>
            <change-password-form @userinfoview="flipped=false"/>
        </template>
    </flipping-card>
</template>

<script>
import DetailsUserProfile from "@/components/user/DetailsUserProfile";
import FlippingCard from "@/components/FlippingCard";
import ChangePasswordForm from "@/components/user/ChangePasswordForm"

export default {
    data: () => ({
        flipped : false
    }),
    components: {
        "details-user-profile": DetailsUserProfile,
        "flipping-card":FlippingCard,
        "change-password-form":ChangePasswordForm
    },
    props:{
        user: {
            required: true
        }
    }

}
</script>