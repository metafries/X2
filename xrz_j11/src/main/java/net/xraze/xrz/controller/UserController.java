package net.xraze.xrz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import net.xraze.xrz.exception.ResourceNotFoundException;
import net.xraze.xrz.model.User;
import net.xraze.xrz.repository.UserRepository;
import net.xraze.xrz.security.CurrentUser;
import net.xraze.xrz.security.UserPrincipal;

@RestController
public class UserController {
	
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }
}
